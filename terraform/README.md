# ValenGeo Project

> Este projeto visa automatizar a infraestrutura da ValenGeo utilizando Terraform, seguindo boas práticas de modularização e integração contínua.

## Sumario

<nav>
<ul>
<li><a href="#vpc" >VPC</a></li>
<li><a href="#ec2" >EC2</a></li>
<li><a href="#ebs" >EBS</a></li>
<li><a href="#s3" >S3</a></li>
<li><a href="#rds" >RDS</a></li>
<li><a href="#Route53" >Route 53</a></li>
</ul>
</nav>

## 📚 Estrutura do Projeto

O projeto segue a seguinte estrutura de pastas, organizada por ambientes (`development`, `production`, `staging`) e módulos reutilizáveis (`vpc`, `ec2`, `s3`, `rds`, `route53`):

```plaintext
valengeo-terraform/
│
├── env/
│   ├── development/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── terraform.tfvars
│   ├── production/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── terraform.tfvars
│   └── staging/
│       ├── main.tf
│       ├── variables.tf
│       ├── outputs.tf
│       └── terraform.tfvars
│
├── modules/
│   ├── vpc/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── ...
│   ├── ec2/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   ├── iam.tf
│   │   └── ...
│   ├── ebs/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── ...
│   ├── s3/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── ...
│   ├── rds/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── ...
│   └── route53/
│       ├── main.tf
│       ├── variables.tf
│       ├── outputs.tf
│       └── ...
│
└── README.md
```
### Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas para as seguintes tarefas:

- [x] Estrutura do Projeto Terraform: Arquitetura modular para facilitar a manutenção e reutilização de código.
- [x] Configuração do Provedor AWS: Configuração do provedor AWS usando variáveis para region e credenciais de acesso.
- [x] Configuração da VPC: VPC com sub-redes públicas e privadas, incluindo grupos de segurança e rotações.
- [x] Instâncias EC2: Instâncias configuradas e provisionadas em sub-redes públicas com regras de segurança aplicadas.
- [x] S3 com Políticas de Bucket: Buckets S3 configurados usando políticas de bucket em vez de ACLs, seguindo as melhores práticas da AWS.
- [x] RDS: Banco de dados relacional provisionado com sub-redes privadas e políticas de segurança aplicadas.
- [x] Route 53: Zona hospedada e registros DNS configurados para gerenciamento de tráfego.
- [x] Configuração dos módulos secundários, incluindo Lambda, SNS, Auto Scaling, e ferramentas de observabilidade como ELK Stack.

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Terraform instalado na versão mais recente.
- AWS CLI configurada com suas credenciais.
- Acesso à conta AWS com permissões adequadas.

## ☕ Usando o Projeto
### Para provisionar a infraestrutura:

1. Navegue até o diretório do ambiente desejado (por exemplo, env/development).

2. Edite o arquivo terraform.tfvars para ajustar as variáveis de configuração conforme necessário. Por exemplo, defina a região da AWS, as chaves de acesso e outros parâmetros personalizados:
```bash
aws_region = "sa-east-1"
AWS_ACCESS_KEY_ID = "SEU_ACCESS_KEY"
AWS_SECRET_ACCESS_KEY = "SEU_SECRET_KEY"
```

3. Comando terraform plan para visualizar as mudanças que serão aplicadas:

Comando init para inicializar o backend remoto do terraform
```bash
terraform init
```

Comando para verificar mudanças na infraestrutrua terraform
```bash
terraform plan
```

Comando para aplicar as mudanças
```bash
terraform apply
```

### Para destruir a infraestrutura:

Atenção, não use esse comando a não ser que tenha plena certeza, o comando destroi toda a infraestrutura criada pelo terraform!
```bash
terraform destroy
```

## 📦 Módulos
Cada módulo possui sua própria configuração. Aqui estão os módulos disponíveis:

### <h2 id="vpc" > VPC </h2> 

Este módulo cria e configura a VPC (Virtual Private Cloud) com sub-redes públicas e privadas, tabelas de rotas, gateways (Internet Gateway e NAT Gateway), e grupos de segurança. A configuração modularizada permite uma fácil adaptação a diferentes ambientes de desenvolvimento, teste e produção.

#### Arquivos principais:

- main.tf: Contém a definição da VPC, sub-redes, tabelas de rotas e grupos de segurança.
- variables.tf: Define as variáveis utilizadas no módulo, como blocos CIDR e zonas de disponibilidade.
- outputs.tf: Expõe valores como IDs de VPC e sub-redes para serem usados por outros módulos.

#### Detalhes da Configuração

- Sub-redes públicas e privadas: O módulo define sub-redes separadas para tráfego público e privado, garantindo maior segurança para instâncias sensíveis. As sub-redes públicas são configuradas para acessar a Internet através do Internet Gateway, enquanto as sub-redes privadas utilizam um NAT Gateway para conexões de saída.

- Tabelas de Roteamento: Tabelas de rotas são configuradas para direcionar o tráfego de rede. A tabela de rotas da sub-rede pública inclui uma rota para o Internet Gateway, permitindo que instâncias nessa sub-rede se comuniquem com a Internet. A tabela de rotas da sub-rede privada inclui uma rota para o NAT Gateway, garantindo que as instâncias possam acessar a Internet para atualizações e patches sem ficarem expostas.

- Grupos de Segurança: Grupos de segurança são regras de firewall que controlam o tráfego de entrada e saída das instâncias na VPC. No main.tf, grupos de segurança são configurados para permitir acesso SSH, HTTP, HTTPS, e conexões específicas para o banco de dados, entre outras regras.

#### Como Alterar e Criar Grupos de Segurança

Para alterar um grupo de segurança existente:

1. Localize o grupo de segurança no arquivo main.tf do módulo vpc. Ele estará identificado por um bloco resource "aws_security_group".

2. Modifique as regras de entrada (ingress) e saída (egress)** conforme necessário. Por exemplo, para permitir tráfego SSH (porta 22) apenas de um IP específico, você pode ajustar o bloco ingress da seguinte maneira:
```bash
ingress {
  from_port   = 22
  to_port     = 22
  protocol    = "tcp"
  cidr_blocks = ["SEU_IP/32"]
}
```

3. Salve as mudanças e execute terraform apply para aplicar as novas regras.

#### Para criar um novo grupo de segurança:

1. Adicione um novo bloco resource "aws_security_group" no arquivo main.tf dentro do módulo vpc. Defina o nome e as regras necessárias para o novo grupo de segurança. Um exemplo básico seria:
```bash
resource "aws_security_group" "meu_novo_grupo" {
  name        = "meu-novo-grupo-seguranca"
  description = "Grupo de segurança para a minha aplicação"

  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "meu-novo-grupo-seguranca"
  }
}
```
3. Adicione regras específicas para o tráfego desejado. O exemplo acima permite tráfego HTTP (porta 80) de qualquer IP.

4. Aplique as alterações com terraform apply.

### <h2 id="ec2" > EC2 </h2>

#### Arquivos principais:

- main.tf: Contém a definição das instâncias EC2, incluindo o tipo de instância, AMI, chaves SSH, grupos de segurança e sub-redes.
- variables.tf: Define as variáveis usadas no módulo, como tipo de instância, AMI, e parâmetros de rede.
- outputs.tf: Expõe valores como o ID da instância e IP público para serem usados por outros módulos.

#### Detalhes da Configuração

- Tipo de Instância e AMI: O módulo permite especificar o tipo de instância EC2 (por exemplo, t2.micro) e a AMI que será usada. Estes parâmetros são configuráveis através de variáveis no arquivo variables.tf.
- Segurança e Rede: As instâncias EC2 são associadas a grupos de segurança e sub-redes dentro da VPC definida pelo módulo VPC. O parâmetro subnet_id permite escolher a sub-rede onde a instância será provisionada.
- Chaves SSH: O módulo também permite a configuração de chaves SSH para acesso remoto às instâncias. É possível especificar o caminho da chave local (key_path) e o nome da chave AWS (key_name).

#### Para criar uma nova instância EC2:

1. Adicione um novo bloco module "ec2" no arquivo main.tf do ambiente desejado (por exemplo, env/development):
```bash
module "ec2" {
  source            = "../../modules/ec2"
  ami               = "ami-0c5410a9e09852edd"
  instance_type     = "t2.micro"
  key_path          = "./terraform.pem"
  key_name          = "terraform"
  security_group_id = module.vpc.security_group_id
  subnet_id         = module.vpc.public_subnet_id
  instance_name     = "nova-instancia"
}
```
2. Salve as mudanças e execute terraform apply para provisionar a nova instância EC2.

### <h2 id="ebs" > EBS </h2>

#### Arquivos principais:

- main.tf: Contém a definição dos volumes EBS e as instruções para anexá-los a instâncias EC2.
- variables.tf: Define as variáveis utilizadas no módulo, como tamanho do volume, tipo e zona de disponibilidade.
- outputs.tf: Expõe valores como o ID do volume EBS e o nome do dispositivo para serem usados por outros módulos.

#### Detalhes da Configuração

- Tamanho e Tipo de Volume: O módulo permite especificar o tamanho (em GB) e o tipo de volume (gp2, io1, etc.). Estes parâmetros são configuráveis através de variáveis no arquivo variables.tf.
- Zona de Disponibilidade: O volume EBS deve estar na mesma zona de disponibilidade que a instância EC2 à qual será anexado. Este parâmetro pode ser configurado através da variável availability_zone.
- Anexação de Volumes: O módulo inclui a lógica para anexar automaticamente o volume EBS a uma instância EC2 específica, especificada pelo parâmetro instance_id.

#### Como criar um novo volume EBS:

1. Adicione um novo bloco module "ebs" no arquivo main.tf do ambiente desejado (por exemplo, env/development):
```bash
module "ebs" {
  source            = "../../modules/ebs"
  ebs_volume_size   = 30
  ebs_volume_type   = "gp2"
  availability_zone = "sa-east-1a"
  ebs_device_name   = "/dev/sdg"
  instance_id       = module.ec2.instance_id
}
```
2. Salve as mudanças e execute terraform apply para provisionar o novo volume EBS e anexá-lo à instância EC2 especificada.

#### Instruções Adicionais

Para listar todos os volumes EBS associados às instâncias EC2, use o comando AWS CLI
```bash
aws ec2 describe-volumes --query "Volumes[*].{ID:VolumeId,State:State,Type:VolumeType,Size:Size,InstanceId:Attachments[0].InstanceId}" --output table
```

### <h2 id="s3" > S3 </h2>

#### Arquivos principais:

- main.tf: Contém a definição dos recursos S3, incluindo a criação do bucket principal, bucket de logs, políticas de bucket, configuração de versionamento e logging.
- variables.tf: Define as variáveis utilizadas no módulo, como o nome do bucket, o ambiente e outros parâmetros relevantes.
- outputs.tf: Expõe valores como o ARN do bucket, o nome do bucket e o ID do bucket para serem usados por outros módulos.

#### Detalhes da Configuração

- Buckets S3: O módulo cria um bucket principal com o nome especificado pela variável bucket_name e um bucket de log associado para armazenar logs de acesso ao bucket principal.
- Políticas de Bucket: As políticas de bucket são configuradas para controlar o acesso ao bucket. No exemplo de configuração atual, a política permite acesso público de leitura (s3:GetObject) a todos os objetos no bucket.
- Versionamento de Bucket: O módulo inclui a opção de habilitar o versionamento no bucket S3. O versionamento ajuda a proteger contra operações acidentais, como exclusão ou substituição de objetos, mantendo versões anteriores.
- Logging de Bucket: O logging de bucket é configurado para registrar o acesso ao bucket principal. Os logs são armazenados em um bucket separado, especificado pelo recurso aws_s3_bucket_logging.

#### Como Usar o Módulo S3

1. No arquivo main.tf do ambiente desejado (por exemplo, env/development), adicione o seguinte bloco de código:

```Bash
module "s3" {
  source        = "../../modules/s3"
  bucket_name   = "my-app-bucket"
  environment   = "development"
}
```

### <h2 id="rds" > RDS </h2>

O módulo RDS (Relational Database Service) é responsável por provisionar uma instância de banco de dados relacional em sub-redes privadas, garantindo segurança e conformidade com as melhores práticas da AWS.

#### Arquivos principais:

- main.tf: Contém a definição do recurso aws_db_instance que configura a instância RDS, incluindo o tipo de banco de dados, versão do engine, classe da instância, configurações de segurança, e opções de backup.
- variables.tf: Define as variáveis utilizadas no módulo, como allocated_storage, engine, instance_class, username, password, e configurações de segurança.
- outputs.tf: Expõe valores como o endpoint da instância RDS e o identificador da instância para serem usados por outros módulos.

#### Detalhes da Configuração

- Instância RDS: O módulo permite especificar o engine de banco de dados (mysql, postgresql, etc.), a versão do engine, o tamanho de armazenamento alocado, e a classe da instância (por exemplo, db.t2.micro), todos configuráveis através de variáveis no arquivo variables.tf.
- Segurança e Rede: A instância RDS é implantada em sub-redes privadas especificadas pelo parâmetro db_subnet_group_name e é associada a grupos de segurança através do parâmetro vpc_security_group_ids. O parâmetro publicly_accessible controla se a instância RDS será acessível publicamente ou não.
- Backup e Retenção: O módulo inclui parâmetros para configurar o período de retenção de backup (backup_retention_period) e a janela de backup (backup_window). Isso permite a customização dos backups automáticos da instância RDS, conforme necessário.

#### Como Usar o Módulo RDS

1. No arquivo main.tf do ambiente desejado (por exemplo, env/dev), adicione o seguinte bloco de código:
```bash
module "rds" {
  source                  = "../../modules/rds"
  allocated_storage       = 20
  engine                  = "mysql"
  engine_version          = "8.0"
  instance_class          = "db.t2.micro"
  identifier              = "my-rds-instance"
  username                = "admin"
  password                = "yourpassword"
  vpc_security_group_id   = module.vpc.security_group_id
  db_subnet_group         = module.vpc.db_subnet_group_name
  publicly_accessible     = false
  backup_retention_period = 7
  backup_window           = "04:00-05:00"
}
```

#### Instruções Adicionais

- Para modificar o tamanho de armazenamento alocado ou a classe da instância: Altere os valores de allocated_storage ou instance_class no bloco de módulo acima.
- Para habilitar o acesso público à instância RDS: Defina o parâmetro publicly_accessible como true. 

### <h2 id="Route53" > Route 53 </h2>

O módulo Route 53 é responsável pelo gerenciamento de DNS, permitindo a configuração de zonas hospedadas e registros DNS para gerenciar o tráfego de rede da aplicação.

#### Arquivos principais:

- main.tf: Contém a definição dos recursos aws_route53_zone e aws_route53_record, que configuram zonas hospedadas e registros DNS para o domínio.
- variables.tf: Define as variáveis utilizadas no módulo, como domain_name, record_name, record_type, e ttl.
- outputs.tf: Expõe valores como o ID da zona hospedada e os detalhes dos registros DNS configurados para serem usados por outros módulos.

#### Detalhes da Configuração

- Zona Hospedada: O módulo cria uma zona hospedada pública ou privada dependendo das configurações fornecidas. O tipo da zona (pública ou privada) é configurável através da variável zone_type.
- Registros DNS: O módulo permite criar vários tipos de registros DNS, incluindo A, CNAME, MX, TXT, e outros, utilizando o recurso aws_route53_record. Os registros DNS são configurados com base nas variáveis record_name, record_type, ttl, e records.

#### Como Usar o Módulo Route 53

1. No arquivo main.tf do ambiente desejado (por exemplo, env/development), adicione o seguinte bloco de código:

```bash
module "route53" {
  source        = "../../modules/route53"
  domain_name   = "example.com"
  record_name   = "www"
  record_type   = "A"
  ttl           = 300
  records       = ["123.45.67.89"]
  zone_type     = "public"
}
```

2. Execute terraform plan e apply para provisionar os recursos Route 53.

#### Exemplos de Uso

- Registro A para um Aplicativo Web: Crie um registro A apontando para o IP público de uma instância EC2 ou load balancer.
- Registros MX para Email: Configure registros MX para gerenciar o tráfego de email para um domínio.
