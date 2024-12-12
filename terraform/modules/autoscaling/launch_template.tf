resource "aws_launch_template" "main" {
  name_prefix   = "valengeo-ec2"
  image_id      = var.ami
  instance_type = var.instance_type

  key_name = var.key_name

  monitoring {
    enabled = true
  }

  network_interfaces {
    associate_public_ip_address = true
    subnet_id                   = var.subnet_id
    security_groups             = [var.security_group_id]
  }

  tag_specifications {
    resource_type = "instance"

    tags = {
      Name = "valengeo-instance"
    }
  }
}
