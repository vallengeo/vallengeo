import { SelectItem } from "@/components/ui/select"

const estados = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
] as const

type Estados = typeof estados[number]

const mapearEstados: { [key in Estados]: string } = {
  AC: "Acre",
  AL: "Alagoas",
  AP: "Amapá",
  AM: "Amazonas",
  BA: "Bahia",
  CE: "Ceará",
  DF: "Distrito Federal",
  ES: "Espírito Santo",
  GO: "Goiás",
  MA: "Maranhão",
  MT: "Mato Grosso",
  MS: "Mato Grosso do Sul",
  MG: "Minas Gerais",
  PA: "Pará",
  PB: "Paraíba",
  PR: "Paraná",
  PE: "Pernambuco",
  PI: "Piauí",
  RJ: "Rio de Janeiro",
  RN: "Rio Grande do Norte",
  RS: "Rio Grande do Sul",
  RO: "Rondônia",
  RR: "Roraima",
  SC: "Santa Catarina",
  SP: "São Paulo",
  SE: "Sergipe",
  TO: "Tocantins",
}

const convertUFToState = (uf: string) => {
  switch (uf) {
    case 'AC': return "Acre";
    case 'AL': return "Alagoas";
    case 'AP': return "Amapá";
    case 'AM': return "Amazonas";
    case 'BA': return "Bahia";
    case 'CE': return "Ceará";
    case 'DF': return "Distrito Federal";
    case 'ES': return "Espírito Santo";
    case 'GO': return "Goiás";
    case 'MA': return "Maranhão";
    case 'MT': return "Mato Grosso";
    case 'MS': return "Mato Grosso do Sul";
    case 'MG': return "Minas Gerais";
    case 'PA': return "Pará";
    case 'PB': return "Paraíba";
    case 'PR': return "Paraná";
    case 'PE': return "Pernambuco";
    case 'PI': return "Piauí";
    case 'RJ': return "Rio de Janeiro";
    case 'RN': return "Rio Grande do Norte";
    case 'RS': return "Rio Grande do Sul";
    case 'RO': return "Rondônia";
    case 'RR': return "Roraima";
    case 'SC': return "Santa Catarina";
    case 'SP': return "São Paulo";
    case 'SE': return "Sergipe";
    case 'TO': return "Tocantins";
  }
}

const ufOptions = Object.entries(mapearEstados).map(([value, label]) => (
  <SelectItem value={value} key={value}>
    {label}
  </SelectItem>
))

export {
  estados,
  mapearEstados,
  convertUFToState,
  ufOptions
}
