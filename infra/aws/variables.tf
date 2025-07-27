variable "aws_region" {
    type        = string
    default     = "us-east-1"
    description = "The AWS region where the resources will be provisioned."
}

variable "bucket_name" {
    type        = string
    description = "The name of the S3 bucket used for hosting your application files."
}

variable "domain" {
    type        = string
    description = "The domain name for your application."
}

variable "environment" {
    type        = string
    default     = "production"
    description = "The environment for the resources (e.g., production, staging)."
}

variable "project_name" {
    type        = string
    default     = "milan-dev"
    description = "The name of the project."
}

variable "create_hosted_zone" {
    type        = bool
    default     = true
    description = "Whether to create a Route 53 hosted zone for the domain."
}