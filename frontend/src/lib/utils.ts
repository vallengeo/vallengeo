import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getCep(cep: string) {
  const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

  if (!res.ok) {
    throw new Error('Falha ao obters os dados')
  }

  return res.json();
}

export const cnpjMask = (value: string) => {
  return value
    .replace(/\D+/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}