resource "aws_sns_topic" "topic" {
  name = "${var.environment}-topic"
}

resource "aws_sns_topic_subscription" "email_subscription" {
  topic_arn = aws_sns_topic.topic.arn
  protocol  = "email"
  endpoint  = var.notification_email
}
