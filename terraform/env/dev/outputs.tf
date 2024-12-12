output "aws_region" {
  value = var.aws_region
}

output "vallengeo_frontend_ec2_public_ip" {
  description = "IP público da instância EC2 do Vallengeo API"
  value       = module.frontend_dev_ec2.public_ip
}

output "vallengeo_frontend_lb" {
  description = "DNS lb do Vallengeo frontend"
  value       = module.frontend_lb.lb_dns_name
}

output "geoserver_lb" {
  description = "DNS lb do Vallengeo frontend"
  value       = module.geoserver_lb.lb_dns_name
}

output "vallengeo_api_ec2_public_ip" {
  description = "IP público da instância EC2 do Vallengeo API"
  value       = module.vallengeo_api_ec2.public_ip
}

output "vallengeo_api_lb" {
  description = "IP público da instância EC2 do Vallengeo API"
  value       = module.api_lb.lb_dns_name
}

output "geoserver_ec2_public_ip" {
  description = "IP público da instância EC2 do Geoserver"
  value       = module.geoserver_ec2.public_ip
}

output "geoserver_instance_id" {
  description = "ID da instancia"
  value       = module.geoserver_ec2.instance_id
}

output "vallengeo_instance_id" {
  description = "ID da instancia"
  value       = module.vallengeo_api_ec2.instance_id
}

output "vallengeo_frontend_instance_id" {
  description = "ID da instancia"
  value       = module.frontend_dev_ec2.instance_id
}

output "dynamodb_table-tfstate" {
  description = "nome da tabela do dynamodb para tfstate "
  value       = module.terraform_s3.dynamodb_table_name
}

output "tfstate_bucket-name" {
  description = "bucket do backend para o terraform"
  value       = module.terraform_s3.bucket_name
}

output "main-S3-bucket-name" {
  description = "bucket principal"
  value       = module.s3.bucket_name
}

output "geoserver_logs_s3e" {
  description = "bucket do geoerver principal"
  value       = module.geoserver_logs_s3.bucket_name
}
