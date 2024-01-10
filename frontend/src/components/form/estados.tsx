import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export default function Estados() {
  return (
    <Select name="uf">
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="AC">Acre</SelectItem>
        <SelectItem value="AL">Alagoas</SelectItem>
        <SelectItem value="AP">Amapá</SelectItem>
        <SelectItem value="AM">Amazonas</SelectItem>
        <SelectItem value="BA">Bahia</SelectItem>
        <SelectItem value="CE">Ceará</SelectItem>
        <SelectItem value="DF">Distrito Federal</SelectItem>
        <SelectItem value="ES">Espírito Santo</SelectItem>
        <SelectItem value="GO">Goiás</SelectItem>
        <SelectItem value="MA">Maranhão</SelectItem>
        <SelectItem value="MT">Mato Grosso</SelectItem>
        <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
        <SelectItem value="MG">Minas Gerais</SelectItem>
        <SelectItem value="PA">Pará</SelectItem>
        <SelectItem value="PB">Paraíba</SelectItem>
        <SelectItem value="PR">Paraná</SelectItem>
        <SelectItem value="PE">Pernambuco</SelectItem>
        <SelectItem value="PI">Piauí</SelectItem>
        <SelectItem value="RJ">Rio de Janeiro</SelectItem>
        <SelectItem value="RN">Rio Grande do Norte</SelectItem>
        <SelectItem value="RS">Rio Grande do Sul</SelectItem>
        <SelectItem value="RO">Rondônia</SelectItem>
        <SelectItem value="RR">Roraima</SelectItem>
        <SelectItem value="SC">Santa Catarina</SelectItem>
        <SelectItem value="SP">São Paulo</SelectItem>
        <SelectItem value="SE">Sergipe</SelectItem>
        <SelectItem value="TO">Tocantins</SelectItem>
      </SelectContent>
    </Select>
  )
}