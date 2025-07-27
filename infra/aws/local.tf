locals {
  s3_origin_id = "myS3Origin"
}

locals {
  project_tags = {
    Name        = var.project_name
    Environment = var.environment
    Project     = var.project_name
  }
}