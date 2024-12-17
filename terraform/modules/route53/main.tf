resource "aws_route53_zone" "main" {
  name = var.domain_name
}

resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "www.${var.domain_name}"
  type    = "A"

  alias {
    name                   = var.lb_dns_name # Usando o DNS do LB aqui
    zone_id                = var.lb_zone_id  # ID da zona do LB
    evaluate_target_health = var.evaluate_target_health
  }
}

resource "aws_route53_record" "alias" {
  zone_id = aws_route53_zone.main.zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = var.lb_dns_name # Usando variável genérica
    zone_id                = var.lb_zone_id  # Usando variável genérica
    evaluate_target_health = var.evaluate_target_health
  }
}
