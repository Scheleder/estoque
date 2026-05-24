import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from 'date-fns';

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getDate(dt) {
  return format(new Date(dt), 'dd/MM/yyyy - HH:mm');
}
