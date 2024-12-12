variable "allocated_storage" {
  description = "The allocated storage in gigabytes"
  type        = number
}

variable "engine" {
  description = "The database engine to use"
  type        = string
}

variable "engine_version" {
  description = "The version of the database engine"
  type        = string
}

variable "instance_class" {
  description = "The instance type of the RDS instance"
  type        = string
}

variable "identifier" {
  description = "The identifier for the RDS instance"
  type        = string
}

variable "username" {
  description = "The username for the database"
  type        = string
}

variable "password" {
  description = "The password for the database"
  type        = string
  sensitive   = true
}

variable "vpc_security_group_id" {
  description = "The VPC security group ID to assign to the RDS instance"
  type        = string
}

variable "db_subnet_group" {
  description = "The DB subnet group name"
  type        = string
}

variable "publicly_accessible" {
  description = "Whether the RDS instance should be publicly accessible"
  type        = bool
  default     = false
}

variable "backup_retention_period" {
  description = "Number of days to retain backups"
  type        = number
  default     = 7 # Retenção de 7 dias por padrão
}

variable "backup_window" {
  description = "The daily time range during which automated backups are created if enabled"
  type        = string
  default     = "02:33-03:03" # Definindo a janela de backup automática
}
