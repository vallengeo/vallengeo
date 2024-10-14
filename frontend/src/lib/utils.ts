import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cookies = () => {
  // Obter cookies fora do diretorio app gera um erro
  // see: https://github.com/vercel/next.js/issues/49757
  return require('next/headers').cookies();
};
