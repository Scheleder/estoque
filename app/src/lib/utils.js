import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from 'date-fns';

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getDate(dt) {
  return format(new Date(dt), 'dd/MM/yyyy - HH:mm');
}

export function formatQuantity(qty, decimals) {
  if (qty === null || qty === undefined || qty === '') return '';
  const num = parseFloat(qty);
  if (isNaN(num)) return qty;
  const dec = (decimals !== undefined && decimals !== null) ? parseInt(decimals, 10) : 2;
  return num.toFixed(dec);
}
