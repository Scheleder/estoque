import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from 'react-router'
import { api } from '@/services/config';
import { Button } from "@/components/ui/button"
import ButtonAdd from '@/components/buttonAdd'
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { Link } from 'react-router-dom'
import { Send } from "lucide-react";

let response = { status: 200, data: { msg: 'Digite o seu endereço de e-mail' } };

export const ResetPassWord = () => {
  const { toast } = useToast()
  const navigate = useNavigate()

  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();

  const mySubmit = async (values) => {
    try {
      setIsProcessing(true);
      response = await api.post('auth/reset', values);
      console.log(response)
      if (response.status === 201) {
        toast({
          title: "Sucesso!",
          description: response.data.msg,
        })
        setTimeout(function () {
          navigate('/update-password')
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

  return (
    <div className="w-full grid grid-cols-2 p-24">
      <div className="flex items-center justify-center py-4 bg-gray-100 overflow-x-auto rounded-lg shadow-md m-2">
        <div className="mx-auto grid w-[350px] gap-4">
          <form onSubmit={handleSubmit(mySubmit)}>
            <div className="grid gap-2 text-center mb-8">
              <h1 className="text-3xl font-bold">Reiniciar a senha</h1>
              {response.status === 202 ? <p className="text-red-500">{response.data.msg}</p> : <p>{response.data.msg}</p>}
            </div>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <div className="flex">
                  <Label htmlFor="email">E-mail</Label>
                </div>
                <Input
                  {...register("email", { required: true })}
                  type="mail"
                  required
                />
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
