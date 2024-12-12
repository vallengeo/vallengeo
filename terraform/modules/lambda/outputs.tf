output "lambda_arn" {
  description = "ARN da função Lambda"
  value       = aws_lambda_function.this.arn
}
