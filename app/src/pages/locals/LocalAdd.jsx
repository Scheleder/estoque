import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router'
import { api }  from '@/services/config';
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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import ButtonAdd from '@/components/buttonAdd'
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Plus } from "lucide-react"

export function LocalAdd() {

    const { toast } = useToast()
    const navigate = useNavigate()

    const [isProcessing, setIsProcessing] = useState(true);
    const [error, setError] = useState(null);
    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");

    const mySubmit = async (values) => {

        try {
            setIsProcessing(true);
            const response = await api.post('/locals', values);
            console.log(response);
            if (response.status === 201) {
                setData(response.data.local);
                toast({
                    title: "Sucesso!",
                    description: response.data.msg,
                })
            } else {
                toast({
                    title: "Falha!",
                    description: response.data.msg,
                })
            }
            setTimeout(function () {
                navigate(0)
            }, 1500);
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

    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    const isAdmin = user && (user.admin === true || user.admin === 1);

    if (!isAdmin) {
        return (
            <button
                type="button"
                disabled
                title="Apenas administradores podem cadastrar novos locais de estoque."
                className="inline-flex m-2.5 bg-gray-100 text-gray-400 border border-gray-200 px-4 py-1.5 rounded-md cursor-not-allowed items-center gap-1 font-semibold text-sm transition-colors"
            >
                <Plus className="w-5 h-5" /> Adicionar
            </button>
        );
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <ButtonAdd />
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-zinc-100">
                <AlertDialogHeader>
                    <AlertDialogTitle>Novo Estoque</AlertDialogTitle>
                    <AlertDialogDescription>
                        <form onSubmit={handleSubmit(mySubmit)}>
                            <Input {...register("name", { required: true })} placeholder="Insira o nome do estoque" />
                            <AlertDialogFooter className="mt-4">
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction type="submit" className="bg-blue-700 hover:bg-blue-500">Salvar</AlertDialogAction>
                            </AlertDialogFooter>
                        </form>
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}
