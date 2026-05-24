import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from '@/services/config'
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from 'react-router'
import { LogIn, Eye, EyeOff, Mail, Lock } from "lucide-react";

let  response = {status:200,data:{msg:'Entre com suas credenciais'}};

export const Login = () => {
  const { toast } = useToast()
  const navigate = useNavigate()

  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const [passVisible, setPassVisible] = useState(false);
  const { register, handleSubmit } = useForm();

  const mySubmit = async (values) => {

    try {
      setIsProcessing(true);
      response = await api.post('/auth/login', values);
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userName', response.data.user.name)
        localStorage.setItem('userMail', response.data.user.email)
        localStorage.setItem('userId', response.data.user.id)
        localStorage.setItem('userPicture', '')
        localStorage.setItem('user', JSON.stringify(response.data.user))
        toast({
          title: response.data.user.name,
          description: response.data.msg,
        })
        setTimeout(function () {
          navigate('/')
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

  const handleGoogleLogin = async (responseGoogle) => {
    try {
      setIsProcessing(true);
      const res = await api.post('/auth/google', { credential: responseGoogle.credential });
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('userName', res.data.user.name)
        localStorage.setItem('userMail', res.data.user.email)
        localStorage.setItem('userId', res.data.user.id)
        localStorage.setItem('userPicture', res.data.user.picture || '')
        localStorage.setItem('user', JSON.stringify(res.data.user))
        toast({
          title: res.data.user.name,
          description: res.data.msg,
        })
        setTimeout(function () {
          navigate('/')
        }, 1500);
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
        description: "Falha ao realizar login com o Google.",
      })
    } finally {
      setIsProcessing(false);
    }
  }

  useEffect(() => {
    const initializeGoogle = () => {
      if (typeof google !== 'undefined') {
        google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || "334758788410-m5pl5c27g7u2ld5r9mmsqgacv4t20fka.apps.googleusercontent.com",
          callback: handleGoogleLogin
        });
        const btnContainer = document.getElementById("google-login-btn");
        if (btnContainer) {
          google.accounts.id.renderButton(
            btnContainer,
            { theme: "outline", size: "large", width: btnContainer.offsetWidth || 384, text: "signin_with", shape: "rectangular" }
          );
        }
      }
    };

    initializeGoogle();

    const interval = setInterval(() => {
      if (typeof google !== 'undefined') {
        initializeGoogle();
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const togglePass = () => {
    setPassVisible(!passVisible)
  }

  return (
    <div className="w-full min-h-[calc(100vh-120px)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card com glassmorphism */}
        <div className="backdrop-blur-md bg-white/80 border border-white/40 rounded-2xl shadow-2xl p-8">
          
          {/* Ícone e título */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7F0000] to-[#404040] flex items-center justify-center shadow-lg">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Acessar</h1>
            { response.status === 202 
              ? <p className="text-red-500 text-sm text-center">{response.data.msg}</p> 
              : <p className="text-gray-500 text-sm text-center">{response.data.msg}</p>
            }
          </div>

          <form onSubmit={handleSubmit(mySubmit)} className="space-y-4">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-700 font-medium">Senha</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-[#7F0000] hover:text-[#990000] underline underline-offset-2"
                >
                  Esqueceu a sua senha?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  {...register("password", { required: true })}
                  type={passVisible ? "text" : "password"}
                  id="inputPassword"
                  placeholder="••••••••"
                  className="pl-10 pr-12 bg-white/70 border-gray-200 focus:border-[#7F0000] focus:ring-[#7F0000]/20 h-11 rounded-lg"
                  required
                />
                <button 
                  type="button" 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" 
                  title="Mostrar Senha" 
                  onClick={togglePass}
                >
                  { passVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" /> }
                </button>
              </div>
            </div>

            {/* Botão */}
            <Button type="submit" className="w-full h-11 mt-2 bg-gradient-to-r from-[#7F0000] to-[#404040] hover:from-[#990000] hover:to-[#555555] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
              <LogIn className="w-4 h-4 mr-2" /> Entrar no Sistema
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/90 text-gray-500 rounded-md">ou continue com</span>
            </div>
          </div>

          <div className="relative flex justify-center w-full">
            {/* Custom Google Button matching standard login style */}
            <Button
              type="button"
              className="w-full h-11 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-lg shadow-sm flex items-center justify-center transition-all duration-200 gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.77c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Entrar com o Google</span>
            </Button>

            {/* Invisible Google Button Overlay */}
            <div
              id="google-login-btn"
              className="absolute inset-0 opacity-0 cursor-pointer [&>div]:w-full [&_iframe]:w-full [&_iframe]:h-full"
              style={{ width: '100%', height: '100%' }}
            ></div>
          </div>

          {/* Link para Registro */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Não é cadastrado?{" "}
            <Link to="/register" className="text-[#7F0000] hover:text-[#990000] font-medium underline underline-offset-2">
              Registre-se
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

