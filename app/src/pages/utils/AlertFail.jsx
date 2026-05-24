import { CircleX } from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertFail({msg}) {
  return (
    <Alert variant="destructive" className="z-10">
      <CircleX className="h-4 w-4" />
      <AlertTitle>Falha!</AlertTitle>
      <AlertDescription>
        {msg}
      </AlertDescription>
    </Alert>
  )
}