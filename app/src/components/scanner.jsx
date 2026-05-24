import { Barcode, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router'
import { useToast } from "@/components/ui/use-toast"
import { api } from '@/services/config';
import { Input } from "@/components/ui/input";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Scanner = () => {
    const inputRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [msg, setMsg] = useState('');
    const [item, setItem] = useState('');
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate()
    const { toast } = useToast()


    const getData = async () => {
        try {
            setIsProcessing(true);
            const response = await api.get('items');
            setData(response.data);
            console.log(response.data);
        } catch (err) {
            setError(err);
            console.log(err);
        } finally {
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleKeyDown = (event) => {
        console.log(event.key)
        if (event.key === 'Enter') {
            //event.preventDefault(); 
            console.log('Enter pressionado!');
            searchData();
        }
    };

    const searchData = () => {
        console.log(inputValue)
        let searched = (data.find(a => a.Component.barcode === inputValue.toString()))
        console.log(location)
        if (!searched) {
            setMsg("Item não Encontrado!")
            toast({ title: 'Falha', description: msg })
        } else if (location.pathname === "/takeout") {
            navigate(`/takeout/${searched.id}`)
            setIsOpen(false)
        } else {
            navigate(`/items/${searched.id}`)
            setIsOpen(false)
        }
    }


    useEffect(() => {
        if (isOpen) {
            const observer = new MutationObserver(() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                    observer.disconnect();
                }
            });

            observer.observe(document, {
                childList: true,
                subtree: true
            });

            return () => observer.disconnect();
        }
    }, [isOpen]);

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger>
                <i className='text-orange-700 hover:text-lime-500 text-sm cursor-pointer'><Barcode /></i>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-zinc-100">
                <AlertDialogHeader>
                    <AlertDialogTitle className="relative">Leitor de código de barras</AlertDialogTitle>
                    <span className='text-red-600 font-italic text-xs text-left absolute right-8 top-16'>{msg}</span>
                    <AlertDialogDescription>
                        <Input id="barCodeScan" ref={inputRef} value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyUp={handleKeyDown} autoComplete="off"/>
                        <AlertDialogFooter className="mt-4">
                            <AlertDialogCancel onClick={() => setIsOpen(false)}>
                                <X className='w-4 h-4 mr-2' /> Cancelar
                            </AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default Scanner;
