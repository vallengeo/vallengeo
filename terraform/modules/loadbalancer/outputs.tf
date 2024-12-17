output "lb_arn" {
  description = "ARN do Load Balancer"
  value       = aws_lb.main.arn
}

output "lb_dns_name" {
  description = "DNS Name do Load Balancer"
  value       = aws_lb.main.dns_name
}

output "lb_zone_id" {
  description = "Zone ID do Load Balancer"
  value       = aws_lb.main.zone_id
}
