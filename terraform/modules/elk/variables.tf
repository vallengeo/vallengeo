variable "ami" {
  type        = string
  description = "AMI para usar nas instâncias EC2"
}

variable "instance_type" {
  type        = string
  description = "Tipo de instância EC2"
}

variable "key_name" {
  type        = string
  description = "Nome da chave SSH"
}

variable "security_group_id" {
  type        = string
  description = "ID do Security Group associado"
}

variable "subnet_id" {
  type        = string
  description = "ID da Subnet onde a instância será lançada"
}
