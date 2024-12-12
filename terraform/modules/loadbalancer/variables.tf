variable "lb_name" {
  description = "Nome do Load Balancer"
  type        = string
}

variable "internal" {
  description = "Se o Load Balancer será interno ou público"
  type        = bool
  default     = false
}

variable "lb_type" {
  description = "Tipo do Load Balancer (application ou network)"
  type        = string
  default     = "application"
}

variable "security_group_id" {
  description = "ID do grupo de segurança associado ao Load Balancer"
  type        = string
}

variable "subnet_ids" {
  description = "Lista de subnets associadas ao Load Balancer"
  type        = list(string)
}

variable "enable_deletion_protection" {
  description = "Proteção contra exclusão do Load Balancer"
  type        = bool
  default     = false
}

variable "vpc_id" {
  description = "ID da VPC para associar o Load Balancer e o Target Group"
  type        = string
}

variable "target_group_port" {
  description = "Porta do Target Group"
  type        = number
  default     = 80
}

variable "target_group_protocol" {
  description = "Protocolo do Target Group (HTTP ou HTTPS)"
  type        = string
  default     = "HTTP"
}

variable "health_check_path" {
  description = "Caminho para a verificação de saúde"
  type        = string
  default     = "/"
}

variable "health_check_interval" {
  description = "Intervalo da verificação de saúde (em segundos)"
  type        = number
  default     = 30
}

variable "health_check_timeout" {
  description = "Timeout da verificação de saúde (em segundos)"
  type        = number
  default     = 5
}

variable "healthy_threshold" {
  description = "Número de verificações saudáveis antes de considerar o recurso saudável"
  type        = number
  default     = 2
}

variable "unhealthy_threshold" {
  description = "Número de verificações malsucedidas antes de considerar o recurso não saudável"
  type        = number
  default     = 2
}

variable "listener_port" {
  description = "Porta do listener do Load Balancer"
  type        = number
  default     = 80
}

variable "listener_protocol" {
  description = "Protocolo do listener do Load Balancer (HTTP ou HTTPS)"
  type        = string
  default     = "HTTP"
}

variable "instance_ids" {
  description = "IDs das instâncias que devem ser associadas ao Target Group"
  type        = list(string)
}

variable "instance_port" {
  description = "Porta da instância para associar ao Target Group"
  type        = number
  default     = 80
}

variable "ssl_certificate_arn" {
  description = "ARN do certificado SSL (necessário para HTTPS)"
  type        = string
  default     = null
}

variable "ssl_policy" {
  description = "Política de SSL (aplicável apenas para HTTPS)"
  type        = string
  default     = "ELBSecurityPolicy-2016-08"
}
