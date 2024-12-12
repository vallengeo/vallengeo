variable "ami" {
  description = "AMI ID for the EC2 instance"
  type        = string
  default     = "ami-0c5410a9e09852edd"
}

variable "instance_type" {
  description = "Type of EC2 instance"
  type        = string
  default     = "t2.micro"
}

variable "key_path" {
  description = "./terraform.pem"
  type        = string
}

variable "key_name" {
  description = "Name of the SSH key pair"
  type        = string
  default     = "terraform"
}

variable "security_group_id" {
  description = "ID of the Security Group"
  type        = string
}

variable "subnet_id" {
  description = "ID of the Subnet"
  type        = string
}

variable "instance_name" {
  description = "Name tag for the EC2 instance"
  type        = string
  default     = "main-ec2"
}

variable "ebs_volume_size" {
  description = "Tamanho do volume EBS em GB"
  type        = number
  default     = 20
}

variable "ebs_volume_type" {
  description = "Tipo do volume EBS (gp2, io1, etc.)"
  type        = string
  default     = "gp2"
}

variable "availability_zone" {
  description = "Zona de disponibilidade para a instância EC2 e volumes EBS"
  type        = string
  default     = "sa-east-1a"
}

variable "ebs_device_name" {
  description = "Nome do dispositivo para anexar o volume EBS na instância EC2"
  type        = string
  default     = "/dev/sdf"
}

variable "iam_instance_profile_name" {
  description = "Nome da IAM role para ec2"
}

variable "user_data" {
  description = "Script user_data para instancias ec2"
  type        = string
  default     = <<-EOF
    #!/bin/bash
    # Atualizar pacotes e instalar dependências
    sudo apt update
    sudo apt install -y openjdk-17-jdk docker.io docker-compose maven postgresql postgresql-contrib postgis nginx

    # Configurar o usuário para usar o docker
    sudo usermod -aG docker $USER

     # Iniciar e habilitar NGINX
    sudo systemctl start nginx
    sudo systemctl enable nginx

    # Configurar e habilitar PostGIS no PostgreSQL
    sudo -u postgres psql -c "CREATE EXTENSION postgis;"
    sudo -u postgres psql -c "CREATE EXTENSION postgis_topology;"

    # Verificar se tudo está instalado
    java -version
    docker --version
    docker-compose --version
    mvn -version
    psql --version
    nginx -v
    sudo -u postgres psql -c "SELECT PostGIS_full_version();"
  EOF
}
