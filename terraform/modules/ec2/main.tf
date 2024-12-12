resource "aws_instance" "main" {
  ami                    = var.ami
  instance_type          = var.instance_type
  key_name               = var.key_name
  vpc_security_group_ids = [var.security_group_id]
  subnet_id              = var.subnet_id
  iam_instance_profile   = var.iam_instance_profile_name # Reutilizando o IAM Instance Profile passado como variável

  # Configuração do user_data para inicializar a instância com as dependências necessárias
  user_data = var.user_data

  # Adicionando tags para identificação
  tags = {
    Name = var.instance_name
  }
}

