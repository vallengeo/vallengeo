resource "aws_iam_role" "dev-ec2_role" {
  name = "dev-ec2-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
      Action = "sts:AssumeRole"
    }]
  })

  lifecycle {
    ignore_changes = [name]
  }
}

resource "aws_iam_role_policy" "ec2_policy" {
  name = "dev-ec2-policy"
  role = aws_iam_role.dev-ec2_role.name
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = "s3:*"
      Resource = "*"
    }]
  })
}

resource "aws_iam_instance_profile" "ec2_instance_profile" {
  name = "dev-ec2-instance-profile"
  role = aws_iam_role.dev-ec2_role.name
}

resource "aws_iam_user" "valengeo_user" {
  name = "valengeo_user"
}

resource "aws_iam_user_policy" "valengeo_user_policy" {
  user = aws_iam_user.valengeo_user.name

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = "*"
        Resource = "*"
      }
    ]
  })
}
