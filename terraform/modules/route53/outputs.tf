output "zone_id" {
  description = "The ID of the Route 53 hosted zone"
  value       = aws_route53_zone.main.zone_id
}

output "domain_name" {
  description = "The domain name managed by Route 53"
  value       = aws_route53_zone.main.name
}

output "www_record_name" {
  description = "The full name of the www record"
  value       = aws_route53_record.www.fqdn
}
