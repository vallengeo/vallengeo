provider "aws" {
  region     = var.aws_region
  access_key = var.AWS_ACCESS_KEY_ID
  secret_key = var.AWS_SECRET_ACCESS_KEY
}

terraform {
  backend "s3" {
    bucket         = "valengeo-dev-terraform-backend"
    key            = "dev/terraform.tfstate"
    region         = "sa-east-1"
    dynamodb_table = "valengeo-dev-terraform-backend-locks"
    encrypt        = true
  }
}

module "terraform_s3" {
  source      = "../../modules/s3"
  bucket_name = "valengeo-dev-terraform-backend"
  environment = "development"
}

// Modulos 

module "vpc_1" {
  source              = "../../modules/vpc"
  vpc_cidr_block      = "10.0.0.0/16"
  vpc_name            = "dev-vpc"
  public_subnet_cidr  = "10.0.1.0/24"
  public_subnet_az    = "sa-east-1a"
  private_subnet_cidr = "10.0.2.0/24"
  private_subnet_az   = "sa-east-1b"
}

module "frontend_dev_ec2" {
  source                    = "../../modules/ec2"
  ami                       = "ami-0c5410a9e09852edd"
  instance_type             = "t2.large"
  key_path                  = "./terraform.pem"
  key_name                  = "terraform"
  security_group_id         = module.vpc_1.security_group_id
  subnet_id                 = module.vpc_1.public_subnet_id
  instance_name             = "frontend-dev"
  iam_instance_profile_name = aws_iam_instance_profile.ec2_instance_profile.name

  user_data = <<-EOF
#!/bin/bash
# Atualizar pacotes e instalar dependências
sudo apt update
sudo apt install -y openjdk-17-jdk docker.io docker-compose maven postgresql postgresql-contrib postgis nginx git nodejs npm

# Configurar o usuário para usar o Docker
sudo usermod -aG docker $USER

# Iniciar e habilitar NGINX
sudo systemctl start nginx
sudo systemctl enable nginx

# Configurar e habilitar PostGIS no PostgreSQL
sudo -u postgres psql -c "CREATE EXTENSION postgis;"
sudo -u postgres psql -c "CREATE EXTENSION postgis_topology;"


cd /home/ubuntu
git clone https://github.com/vallengeo/vallengeo.git

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

module "vallengeo_api_ec2" {
  source                    = "../../modules/ec2"
  ami                       = "ami-0c5410a9e09852edd"
  instance_type             = "t2.large"
  key_path                  = "./terraform.pem"
  key_name                  = "terraform"
  security_group_id         = module.vpc_1.security_group_id
  subnet_id                 = module.vpc_1.public_subnet_id
  instance_name             = "dev-instance"
  iam_instance_profile_name = aws_iam_instance_profile.ec2_instance_profile.name

  user_data = <<-EOF
#!/bin/bash
# Atualizar pacotes e instalar dependências
sudo apt update
sudo apt install -y openjdk-17-jdk docker.io docker-compose maven postgresql postgresql-contrib postgis nginx git

# Configurar o usuário para usar o Docker
sudo usermod -aG docker $USER

# Iniciar e habilitar NGINX
sudo systemctl start nginx
sudo systemctl enable nginx

# Configurar e habilitar PostGIS no PostgreSQL
sudo -u postgres psql -c "CREATE EXTENSION postgis;"
sudo -u postgres psql -c "CREATE EXTENSION postgis_topology;"

# Instalar o GeoServer via Docker
cd /home/ubuntu
git clone https://github.com/vallengeo/vallengeo.git
cd repositorio/Backend/docker/vallengeo

# Criar arquivo .env com as variáveis de ambiente necessárias para o GeoServer
# Criar o arquivo .env com as variáveis de ambiente necessárias para o GeoServer
sudo tee .env > /dev/null <<EOT
# DATABASE
POSTGRES_VERSION=latest
DATABASE_PORT=5432
POSTGRES_MULTIPLE_DATABASES=true
POSTGRES_DB=vallengeo
POSTGRES_DB_DOCKER_PORT=5433
POSTGRES_DB_LOCAL_PORT=5432
DATABASE_URL=jdbc:postgresql://localhost:5132/vallengeo
POSTGRES_USER=vallengeo
POSTGRES_PASSWORD=123456
EOT

# Verificar se o arquivo .env foi criado e tem o conteúdo esperado
if [ -f .env ]; then
  echo ".env criado com sucesso com o seguinte conteúdo:"
  cat .env
else
  echo "Erro: o arquivo .env não foi criado."
fi

# Inicializar com Docker Compose
sudo docker-compose -f ./postgres.yml up

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

module "geoserver_ec2" {
  source                    = "../../modules/ec2"
  ami                       = "ami-0c5410a9e09852edd"
  instance_type             = "t3.large"
  key_path                  = "./terraform.pem"
  key_name                  = "terraform"
  security_group_id         = module.vpc_1.security_group_id
  subnet_id                 = module.vpc_1.public_subnet_id
  instance_name             = "geoserver-instance"
  iam_instance_profile_name = aws_iam_instance_profile.ec2_instance_profile.name

  user_data = <<-EOF
#!/bin/bash
# Atualizar pacotes e instalar dependências
sudo apt update
sudo apt install -y openjdk-17-jdk docker.io docker-compose maven postgresql postgresql-contrib postgis nginx git

# Configurar o usuário para usar o Docker
sudo usermod -aG docker $USER

# Iniciar e habilitar NGINX
sudo systemctl start nginx
sudo systemctl enable nginx

# Configurar e habilitar PostGIS no PostgreSQL
sudo -u postgres psql -c "CREATE EXTENSION postgis;"
sudo -u postgres psql -c "CREATE EXTENSION postgis_topology;"

# Instalar o GeoServer via Docker
cd /home/ubuntu
git clone https://github.com/vallengeo/vallengeo.git

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

module "ebs" {
  source            = "../../modules/ebs"
  ebs_volume_size   = 200
  ebs_volume_type   = "gp2"
  availability_zone = "sa-east-1a"
  ebs_device_name   = "/dev/sdf"
  instance_id       = module.vallengeo_api_ec2.instance_id
}

module "geoserver_ebs" {
  source            = "../../modules/ebs"
  ebs_volume_size   = 100
  ebs_volume_type   = "gp2"
  availability_zone = "sa-east-1a"
  ebs_device_name   = "/dev/sdg"
  instance_id       = module.geoserver_ec2.instance_id
}

module "frontend_ebs" {
  source            = "../../modules/ebs"
  ebs_volume_size   = 100
  ebs_volume_type   = "gp2"
  availability_zone = "sa-east-1a"
  ebs_device_name   = "/dev/sdg"
  instance_id       = module.frontend_dev_ec2.instance_id
}

module "s3" {
  source      = "../../modules/s3"
  bucket_name = "valengeo-dev-bucket"
  environment = "development"
}

module "geoserver_logs_s3" {
  source      = "../../modules/s3"
  bucket_name = "geoserver-logs-dev-bucket"
  environment = "development"
}

module "rds" {
  source                = "../../modules/rds"
  allocated_storage     = 20
  engine                = "postgres"
  engine_version        = "14"
  instance_class        = "db.t3.micro"
  identifier            = "valengeo-dev-db"
  username              = "TerraformDev"
  password              = "eurNAPErgA"
  vpc_security_group_id = module.vpc_1.security_group_id
  db_subnet_group       = module.vpc_1.db_subnet_group_name
  publicly_accessible   = false

  backup_retention_period = 0
}

module "frontend_lb" {
  source                = "../../modules/loadbalancer"
  lb_name               = "frontend-lb"
  security_group_id     = module.vpc_1.security_group_id
  subnet_ids            = [module.vpc_1.public_subnet_id, module.vpc_1.private_subnet_id]
  vpc_id                = module.vpc_1.vpc_id
  target_group_port     = 9001
  target_group_protocol = "HTTP"
  listener_port         = 80
  listener_protocol     = "HTTP"
  health_check_path     = "/"
  health_check_interval = 300
  health_check_timeout  = 5
  healthy_threshold     = 2
  unhealthy_threshold   = 2
  instance_ids          = module.frontend_dev_ec2[*].instance_id
  instance_port         = 3000
  //ssl_certificate_arn   = aws_acm_certificate.frontend_cert.arn
}

module "geoserver_lb" {
  source                = "../../modules/loadbalancer"
  lb_name               = "geoserver-lb"
  security_group_id     = module.vpc_1.security_group_id
  subnet_ids            = [module.vpc_1.public_subnet_id, module.vpc_1.private_subnet_id]
  vpc_id                = module.vpc_1.vpc_id
  target_group_port     = 9001
  target_group_protocol = "HTTP"
  listener_port         = 80
  listener_protocol     = "HTTP"
  health_check_path     = "/"
  health_check_interval = 300
  health_check_timeout  = 5
  healthy_threshold     = 2
  unhealthy_threshold   = 2
  instance_ids          = module.vallengeo_api_ec2[*].instance_id
  instance_port         = 9001
  //ssl_certificate_arn   = aws_acm_certificate.geoserver_cert.arn
}

module "api_lb" {
  source                = "../../modules/loadbalancer"
  lb_name               = "api-lb"
  security_group_id     = module.vpc_1.security_group_id
  subnet_ids            = [module.vpc_1.public_subnet_id, module.vpc_1.private_subnet_id]
  vpc_id                = module.vpc_1.vpc_id
  target_group_port     = 9000
  target_group_protocol = "HTTP"
  listener_port         = 80
  listener_protocol     = "HTTP"
  health_check_path     = "/"
  health_check_interval = 300
  health_check_timeout  = 5
  healthy_threshold     = 2
  unhealthy_threshold   = 2
  instance_ids          = module.vallengeo_api_ec2[*].instance_id
  instance_port         = 9000
  //ssl_certificate_arn   = aws_acm_certificate.api_cert.arn
}

//

module "frontend_route53" {
  source        = "../../modules/route53"
  domain_name   = "vallengeo.com.br"
  ttl           = 300
  ec2_public_ip = module.frontend_dev_ec2.public_ip
  lb_dns_name   = module.frontend_lb.lb_dns_name
  lb_zone_id    = module.frontend_lb.lb_zone_id
  create_alias  = true
}

module "api_route53" {
  source        = "../../modules/route53"
  domain_name   = "api.vallengeo.com.br"
  ttl           = 300
  ec2_public_ip = module.vallengeo_api_ec2.public_ip
  lb_dns_name   = module.api_lb.lb_dns_name
  lb_zone_id    = module.api_lb.lb_zone_id
  create_alias  = true
}

module "geoserver_route53" {
  source        = "../../modules/route53"
  domain_name   = "geoserver.vallengeo.com.br"
  ttl           = 300
  ec2_public_ip = module.vallengeo_api_ec2.public_ip
  lb_dns_name   = module.geoserver_lb.lb_dns_name
  lb_zone_id    = module.geoserver_lb.lb_zone_id
  create_alias  = true
}

resource "aws_acm_certificate" "frontend_cert" {
  domain_name       = "vallengeo.com.br"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate" "api_cert" {
  domain_name       = "api.vallengeo.com.br"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate" "geoserver_cert" {
  domain_name       = "geoserver.vallengeo.com.br"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

//

module "sns" {
  source             = "../../modules/sns"
  environment        = "dev"
  notification_email = "vallengeo.dev@gmail.com"
}

module "autoscaling" {
  source            = "../../modules/autoscaling"
  ami               = "ami-0c5410a9e09852edd"
  instance_type     = "t2.micro"
  key_name          = "terraform"
  subnet_id         = module.vpc_1.public_subnet_id
  security_group_id = module.vpc_1.security_group_id
  min_size          = 1
  max_size          = 3
  desired_capacity  = 1
}

module "elk" {
  source            = "../../modules/elk"
  ami               = "ami-0c5410a9e09852edd"
  instance_type     = "t3.micro"
  key_name          = "terraform"
  security_group_id = module.vpc_1.security_group_id
  subnet_id         = module.vpc_1.public_subnet_id
}

