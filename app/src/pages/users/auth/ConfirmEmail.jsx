import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from 'react-router'
import { api } from '@/services/config';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { Link } from 'react-router-dom'
import { MailCheck, Hash, Send, RefreshCw } from "lucide-react";

let  response = {status:200,data:{msg:'Digite o código recebido por e-mail'}};

export function ConfirmEmail() {
    const { id } = useParams();
    const { toast } = useToast()
    const navigate = useNavigate()

    const [isProcessing, setIsProcessing] = useState(true);
    const [isResending, setIsResending] = useState(false);
    const [error, setError] = useState(null);
    const { register, handleSubmit, setValue } = useForm();

    const resendCode = async () => {
      try {
        setIsResending(true);
        const res = await api.get(`/auth/send/${id}`);
        if (res.status === 201) {
          toast({
            title: "Código reenviado!",
            description: res.data.msg,
          })
        } else {
          toast({
            title: "Falha!",
            description: res.data.msg,
          })
        }
      } catch (err) {
        console.log(err);
        toast({
          title: "Erro!",
          description: "Não foi possível reenviar o código.",
        })
      } finally {
        setIsResending(false);
      }
    }

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
      <div className="w-full min-h-[calc(100vh-120px)] flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Card com glassmorphism */}
          <div className="backdrop-blur-md bg-white/80 border border-white/40 rounded-2xl shadow-2xl p-8">
            
            {/* Ícone e título */}
            <div className="flex flex-col items-center gap-3 mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7F0000] to-[#404040] flex items-center justify-center shadow-lg">
                <MailCheck className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Confirmar E-mail</h1>
              { response.status === 202 
                ? <p className="text-red-500 text-sm text-center">{response.data.msg}</p> 
                : <p className="text-gray-500 text-sm text-center">{response.data.msg}</p>
              }
            </div>

            <form onSubmit={handleSubmit(mySubmit)} className="space-y-4">
              {/* Código de verificação */}
              <div className="space-y-2">
                <Label htmlFor="code" className="text-gray-700 font-medium">Código de Verificação</Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    {...register("code", { required: true })}
                    type="text"
                    placeholder="Digite o código"
                    className="pl-10 bg-white/70 border-gray-200 focus:border-[#7F0000] focus:ring-[#7F0000]/20 h-11 rounded-lg text-center"
                    required
                  />
                </div>
                <input type="hidden" {...register("userId", { required: true })} />
              </div>

              {/* Botão */}
              <Button type="submit" className="w-full h-11 mt-2 bg-gradient-to-r from-[#7F0000] to-[#404040] hover:from-[#990000] hover:to-[#555555] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                <Send className="w-4 h-4 mr-2" /> Enviar Código
              </Button>
            </form>

            {/* Link para reenviar código */}
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={resendCode}
                disabled={isResending}
                className="inline-flex items-center gap-1.5 text-sm text-[#7F0000] hover:text-[#990000] font-medium underline underline-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
                {isResending ? 'Reenviando...' : 'Reenviar código por e-mail'}
              </button>
            </div>

            {/* Link para Login */}
            <div className="mt-4 text-center text-sm text-gray-600">
              Já confirmou?{" "}
              <Link to="/login" className="text-[#7F0000] hover:text-[#990000] font-medium underline underline-offset-2">
                Faça login
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }