variable "availability_zone" {
  description = "The availability zone where the EBS volume will be created"
  type        = string
}

variable "ebs_volume_size" {
  description = "Size of the EBS volume in GB"
  type        = number
}

variable "ebs_volume_type" {
  description = "Type of the EBS volume (gp2, io1, etc.)"
  type        = string
  default     = "gp2"
}

variable "ebs_volume_name" {
  description = "Name tag for the EBS volume"
  type        = string
  default     = "valengeo-ebs-volume"
}

variable "ebs_device_name" {
  description = "Device name for attaching the EBS volume (e.g., /dev/sdf)"
  type        = string
  default     = "/dev/sdf"
}

variable "instance_id" {
  description = "ID of the EC2 instance to attach the EBS volume"
  type        = string
}
