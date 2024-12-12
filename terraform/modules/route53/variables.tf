variable "domain_name" {
  description = "The domain name to create in Route 53"
  type        = string
  default     = null
}

variable "ec2_public_ip" {
  description = "The public IP of the EC2 instance"
  type        = string
  default     = null
}

variable "records" {
  description = "List of records to associate with the domain"
  type        = list(string)
  default     = null
}

variable "ttl" {
  description = "TTL for the DNS record"
  type        = string
  default     = "300"
}

variable "type" {
  description = "The DNS record type (e.g., A, CNAME)"
  type        = string
  default     = "A"
}

variable "lb_dns_name" {
  description = "The DNS name of the Load Balancer (Optional for alias record)"
  type        = string
  default     = ""
  nullable    = true
}

variable "lb_zone_id" {
  description = "The zone ID of the Load Balancer (Optional for alias record)"
  type        = string
  default     = ""
  nullable    = true
}

variable "evaluate_target_health" {
  description = "Flag to evaluate the health of the target"
  type        = bool
  default     = true
}

variable "create_alias" {
  description = "Flag to determine if an alias record should be created"
  type        = bool
  default     = false
}
