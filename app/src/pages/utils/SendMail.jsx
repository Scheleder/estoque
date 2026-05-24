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
import { Link as WWW, Send, Save } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export function SendMail({ user }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <span title="Enviar e-mail" className='absolute text-blue-500 hover:text-blue-400 top-3 left-2 cursor-pointer'><Send className='w-4 h-4' /></span>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-zinc-100">
                <AlertDialogHeader>
                    <AlertDialogTitle>Enviar email para {user}</AlertDialogTitle>
                    <AlertDialogDescription>
                        <Textarea placeholder="Insira a mensagem" rows="4" className=""/>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction className="bg-orange-600 hover:bg-orange-500">Enviar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
