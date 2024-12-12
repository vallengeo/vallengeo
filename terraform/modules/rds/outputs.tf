output "rds_endpoint" {
  value = aws_db_instance.main.endpoint
}

output "rds_instance_identifier" {
  value = aws_db_instance.main.identifier
}
