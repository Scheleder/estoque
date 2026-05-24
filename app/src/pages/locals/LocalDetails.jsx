import { useParams, useNavigate } from 'react-router-dom'
import { React, useEffect, useState } from 'react';
import { api }  from '@/services/config';
import { getDate } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Loading from '@/components/loading';
import Pagetitle from '@/components/pagetitle';
import { Input } from '@/components/ui/input'
import { Eye, Send, Save, Earth } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import ErrorPage from "../utils/ErrorPage"
import { useToast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form";


const LocalDetails = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [local, setLocal] = useState([]);
    const [isProcessing, setIsProcessing] = useState(true);
    const [error, setError] = useState(null);
    const { toast } = useToast();
    const { register, handleSubmit } = useForm();

    const getData = async () => {
        try {
            setIsProcessing(true);
            const response = await api.get(`locals/${id}`);
            setLocal(response.data.local);
            console.log(response.data.local);
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

    const mySubmit = async (values) => {

        try {
            setIsProcessing(true);
            const response = await api.put(`locals/${id}`, values);
            setLocal(response.data.local);
            console.log(response.data.local);
            if (response.status === 200) {
                toast({
                    title: "Atualizado!",
                    description: response.data.msg,
                })
            } else {
                toast({
                    title: "Falha!",
                    description: response.data.msg,
                })
            }
        } catch (err) {
            setError(err);
            console.log(err);
            toast({
                title: "Erro!",
                description: err,
            })
        } finally {
            setIsProcessing(false);
        }
    }

    return (
        <>
            {isProcessing ? (
                <div className="pl-16 pt-20">
                    <Loading />
                </div>
            ) : error ? (
                <ErrorPage error={error} />
            ) : (
                <div className="pl-16 pt-20">
                    <div className="mt-2 shadow-lg rounded-md mr-2 p-2 bg-gray-200">
                        <form onSubmit={handleSubmit(mySubmit)}>
                            <div className='grid grid-cols-3 mb-2'>
                                <div className='col-span-2 mt-2'>
                                    <label>Estoque:</label>
                                </div>
                                <div className='col-span-1 mt-2'></div>
                                <div className='col-span-2'>
                                    <Input {...register("name", { required: true })} className=" mr-4" defaultValue={local.name} />
                                </div>
                                <div className='flex col-span-1'>
                                    <Button type="submit" className="ml-4 w-full bg-blue-700 hover:bg-blue-500"><Save className='w-4 h-4 mr-2' /> Salvar alterações</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default LocalDetails