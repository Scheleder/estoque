import { Check, CircleCheck } from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertSuccess({msg}) {
  return (
    <Alert>
      <CircleCheck className="h-4 w-4" />
      <AlertTitle>Sucesso!</AlertTitle>
      <AlertDescription>
        {msg}
      </AlertDescription>
    </Alert>
  )
}
