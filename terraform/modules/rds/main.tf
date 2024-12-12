resource "aws_db_instance" "main" {
  allocated_storage      = var.allocated_storage
  engine                 = var.engine
  engine_version         = var.engine_version
  instance_class         = var.instance_class
  identifier             = var.identifier
  username               = var.username
  password               = var.password
  vpc_security_group_ids = [var.vpc_security_group_id]
  db_subnet_group_name   = var.db_subnet_group
  publicly_accessible    = var.publicly_accessible
  skip_final_snapshot    = true

  backup_retention_period = var.backup_retention_period
  backup_window           = var.backup_window

  tags = {
    Name = var.identifier
  }
}
