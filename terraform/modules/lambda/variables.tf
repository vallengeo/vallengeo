variable "function_name" {
  description = "Nome da função Lambda"
  type        = string
}

variable "handler" {
  description = "Handler da função Lambda (e.g., lambda_function.lambda_handler)"
  type        = string
  default     = "lambda_function.lambda_handler"
}

variable "runtime" {
  description = "Runtime da função Lambda (e.g., python3.8)"
  type        = string
  default     = "python3.8"
}

variable "environment_variables" {
  description = "Variáveis de ambiente para a função Lambda"
  type        = map(string)
  default     = {}
}

variable "s3_bucket" {
  description = "Nome do bucket S3 onde o código da Lambda será armazenado"
  type        = string
}

variable "s3_bucket_arn" {
  description = "ARN do bucket S3 onde o código da Lambda será armazenado"
  type        = string
}
