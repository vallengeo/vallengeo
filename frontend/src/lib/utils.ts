import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function consultarCep(cep: string) {
  const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

  if (!res.ok) {
    throw new Error('Falha ao obters os dados')
  }

  return res.json();
}

export const formatarCampo = (value: string, formato: string) => {
  const formattedValue = value.replace(/\D/g, '');
  const pattern = getPattern(formato);
  const maskedValue = formattedValue.replace(pattern[0], `${pattern[1]}`);

  return maskedValue;
};

const getPattern = (formato: string) => {
  switch (formato) {
    case 'CNPJ':
      return [/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5'];
    case 'CPF':
      return [/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4'];
    case 'RG':
      return [/^(\d{2})(\d{3})(\d{3})(\d{1})$/, '$1.$2.$3-$4'];
    case 'CEP':
      return [/^(\d{5})(\d{3})$/, '$1-$2'];
    case 'Telefone':
      return [/^(\d{2})(\d{4,5})(\d{4})$/, '($1) $2-$3'];
    default:
      throw new Error('Formato não suportado');
  }
};