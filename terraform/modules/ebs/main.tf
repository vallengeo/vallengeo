resource "aws_ebs_volume" "ebs_volume" {
  availability_zone = var.availability_zone
  size              = var.ebs_volume_size
  type              = var.ebs_volume_type

  tags = {
    Name = var.ebs_volume_name
  }
}

resource "aws_volume_attachment" "ebs_attachment" {
  device_name = var.ebs_device_name
  volume_id   = aws_ebs_volume.ebs_volume.id
  instance_id = var.instance_id
}
