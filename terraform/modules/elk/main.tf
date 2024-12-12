resource "aws_instance" "elasticsearch" {
  ami                    = var.ami
  instance_type          = var.instance_type
  key_name               = var.key_name
  vpc_security_group_ids = [var.security_group_id]
  subnet_id              = var.subnet_id

  user_data = <<-EOF
    #!/bin/bash
    sudo apt update -y
    sudo apt install -y openjdk-11-jdk
    wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.17.8-amd64.deb
    sudo dpkg -i elasticsearch-7.17.8-amd64.deb
    sudo systemctl enable elasticsearch
    sudo systemctl start elasticsearch
  EOF

  tags = {
    Name = "elasticsearch"
  }
}

resource "aws_instance" "logstash" {
  ami                    = var.ami
  instance_type          = var.instance_type
  key_name               = var.key_name
  vpc_security_group_ids = [var.security_group_id]
  subnet_id              = var.subnet_id

  user_data = <<-EOF
    #!/bin/bash
    sudo apt update -y
    sudo apt install -y openjdk-11-jdk
    wget https://artifacts.elastic.co/downloads/logstash/logstash-7.17.8.deb
    sudo dpkg -i logstash-7.17.8.deb
    sudo systemctl enable logstash
    sudo systemctl start logstash
  EOF

  tags = {
    Name = "logstash"
  }
}

resource "aws_instance" "kibana" {
  ami                    = var.ami
  instance_type          = var.instance_type
  key_name               = var.key_name
  vpc_security_group_ids = [var.security_group_id]
  subnet_id              = var.subnet_id

  user_data = <<-EOF
    #!/bin/bash
    sudo apt update -y
    sudo apt install -y openjdk-11-jdk
    wget https://artifacts.elastic.co/downloads/kibana/kibana-7.17.8-amd64.deb
    sudo dpkg -i kibana-7.17.8-amd64.deb
    sudo systemctl enable kibana
    sudo systemctl start kibana
  EOF

  tags = {
    Name = "kibana"
  }
}
