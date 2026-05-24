import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from 'react-router'
import { api }  from '@/services/config';
import { Button } from "@/components/ui/button"
import ButtonAdd from '@/components/buttonAdd'
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { Link } from 'react-router-dom'
import { Send } from "lucide-react";

let  response = {status:200,data:{msg:'Digite o código recebido por e-mail'}};

export function ConfirmEmail() {
    const { id } = useParams();
    const { toast } = useToast()
    const navigate = useNavigate()

    const [isProcessing, setIsProcessing] = useState(true);
    const [error, setError] = useState(null);
    const { register, handleSubmit, setValue } = useForm();

    const mySubmit = async (values) => {
      try {
        setIsProcessing(true);
        response = await api.post('auth/confirm', values);
        if (response.status === 200) {
          toast({
            title: "Confirmado!",
            description: response.data.msg,
          })
          setTimeout(function () {
            navigate('/login')
          }, 1500);
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

    useEffect(() => {
      setValue("userId", id);
    }, [setValue]);

    return (
      <div className="w-full grid grid-cols-2 p-24">
        <div className="flex items-center justify-center py-4 bg-gray-100 overflow-x-auto rounded-lg shadow-md m-2">
          <div className="mx-auto grid w-[350px] gap-4">
            <form onSubmit={handleSubmit(mySubmit)}>
              <div className="grid gap-2 text-center mb-8">
                <h1 className="text-3xl font-bold">Confirmar e-mail</h1>
                { response.status === 202 ? <p className="text-red-500">{response.data.msg}</p> : <p>{response.data.msg}</p>}              
              </div>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <div className="flex items-center">
                    <Label htmlFor="password">Código de verificação</Label>
                  </div>
                  <Input
                    {...register("code", { required: true })}
                    className="text-center"
                    type="text"
                    required 
                    />
                  <input type="hidden" {...register("userId", { required: true })} />
                </div>
                <Button type="submit" className="w-full mt-4">
                  <Send className="w-4 h-4 mr-2" /> Enviar Código
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <img
            src="/fundo2.jpg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    )
            
  }