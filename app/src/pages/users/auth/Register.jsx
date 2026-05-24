import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from '@/services/config'
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from 'react-router'
import { UserPlus, Mail, Lock, User, Eye, EyeOff } from "lucide-react";

let  response = {status:200,data:{msg:'Preencha o formulário'}};

export const Register = () => {
  const { toast } = useToast()
  const navigate = useNavigate()

  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const [passVisible, setPassVisible] = useState(false);
  const [confirmPassVisible, setConfirmPassVisible] = useState(false);
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
    <div className="w-full min-h-[calc(100vh-120px)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card com glassmorphism */}
        <div className="backdrop-blur-md bg-white/80 border border-white/40 rounded-2xl shadow-2xl p-8">
          
          {/* Ícone e título */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7F0000] to-[#404040] flex items-center justify-center shadow-lg">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Criar Conta</h1>
            { response.status === 202 
              ? <p className="text-red-500 text-sm text-center">{response.data.msg}</p> 
              : <p className="text-gray-500 text-sm text-center">{response.data.msg}</p>
            }
          </div>

          <form onSubmit={handleSubmit(mySubmit)} className="space-y-4">
            {/* Nome */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-medium">Nome</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Seu Nome"
                  className="pl-10 bg-white/70 border-gray-200 focus:border-[#7F0000] focus:ring-[#7F0000]/20 h-11 rounded-lg"
                  required
                />
              </div>
            </div>

            {/* E-mail */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  className="pl-10 bg-white/70 border-gray-200 focus:border-[#7F0000] focus:ring-[#7F0000]/20 h-11 rounded-lg"
                  required
                />
              </div>
            </div>

            {/* Senha */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  {...register("password", { required: true })}
                  type={passVisible ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-12 bg-white/70 border-gray-200 focus:border-[#7F0000] focus:ring-[#7F0000]/20 h-11 rounded-lg"
                  required
                />
                <button 
                  type="button" 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" 
                  title="Mostrar Senha" 
                  onClick={() => setPassVisible(!passVisible)}
                >
                  { passVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" /> }
                </button>
              </div>
            </div>

            {/* Confirmar Senha */}
            <div className="space-y-2">
              <Label htmlFor="confirmpassword" className="text-gray-700 font-medium">Repita a senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  {...register("confirmpassword", { required: true })}
                  type={confirmPassVisible ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-12 bg-white/70 border-gray-200 focus:border-[#7F0000] focus:ring-[#7F0000]/20 h-11 rounded-lg"
                  required
                />
                <button 
                  type="button" 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" 
                  title="Mostrar Senha" 
                  onClick={() => setConfirmPassVisible(!confirmPassVisible)}
                >
                  { confirmPassVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" /> }
                </button>
              </div>
            </div>

            {/* Botão */}
            <Button type="submit" className="w-full h-11 mt-2 bg-gradient-to-r from-[#7F0000] to-[#404040] hover:from-[#990000] hover:to-[#555555] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
              <UserPlus className="w-4 h-4 mr-2" /> Enviar Cadastro
            </Button>
          </form>

          {/* Link para Login */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Já é cadastrado?{" "}
            <Link to="/login" className="text-[#7F0000] hover:text-[#990000] font-medium underline underline-offset-2">
              Entre
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

