import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from '@/services/config'
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from 'react-router'
import { LogIn, DoorOpen  } from "lucide-react";

let  response = {status:200,data:{msg:'Preencha o formulário'}};

export const Register = () => {
  const { toast } = useToast()
  const navigate = useNavigate()

  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();

  const mySubmit = async (values) => {

    try {
      setIsProcessing(true);
      response = await api.post('/auth/register', values);
      console.log(response);
      if (response.status === 201) {
        toast({
          title: 'Cadastrado com sucesso!',
          description: response.data.msg,
        })
        setTimeout(function () {
          navigate(`/confirm-email/${response.data.id}`)
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
      <div className="flex items-center justify-center py-4 bg-gray-100 overflow-hide rounded-lg shadow-md m-2">
        <div className="mx-auto grid w-[350px] gap-4">
          <form onSubmit={handleSubmit(mySubmit)}>
            <div className="grid gap-2 text-center mb-8">
              <h1 className="text-3xl font-bold">Registrar</h1>
              { response.status === 202 ? <p className="text-red-500">{response.data.msg}</p> : <p>{response.data.msg}</p>} 
            </div>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label htmlFor="name">Nome</Label>
                <Input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Seu Nome"
                  required
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="seunome@grupoboticario.com.br"
                  required
                />
              </div>
              <div className="grid gap-1">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                </div>
                <Input
                  {...register("password", { required: true })}
                  type="password"
                  required
                />
              </div>
              <div className="grid gap-1">
                <div className="flex items-center">
                  <Label htmlFor="confirmpassword">Repita a senha</Label>
                </div>
                <Input
                  {...register("confirmpassword", { required: true })}
                  type="password"
                  required
                />
              </div>
              <Button type="submit" className="w-full mt-4">
                <DoorOpen className="w-4 h-4 mr-2"/> Enviar Cadastro
              </Button>
              {/* <Button variant="outline" className="w-full">
              Entrar com o Google
            </Button> */}
            </div>
            <div className="mt-2 text-center text-sm">
              Já é cadastrado? {" "}
              <Link to="/login" className="underline">
                Entre
              </Link>
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
