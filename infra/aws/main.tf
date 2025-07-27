provider "aws" {
  region = var.aws_region
}

terraform {

  backend "s3" {
    bucket = "cyoub-tf-state"
    key    = "sandraoliverio-com-br/terraform.tfstate"
    region = "us-east-1"
  }
}