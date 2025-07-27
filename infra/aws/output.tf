output "bucket_regional_domain_name" {
  value = aws_s3_bucket.s3_bucket.bucket_regional_domain_name
}

output "bucket_id" {
  value = aws_s3_bucket.s3_bucket.id
}

output "bucket_arn" {
  value = aws_s3_bucket.s3_bucket.arn
}

output "cloudfront_distribution_id" {
  description = "The ID of the CloudFront distribution."
  value       = aws_cloudfront_distribution.s3_distribution.id
}

output "hosted_zone_id" {
  description = "The ID of the Route 53 hosted zone."
  value       = var.create_hosted_zone ? aws_route53_zone.main[0].zone_id : data.aws_route53_zone.main[0].zone_id
}

output "hosted_zone_name_servers" {
  description = "The name servers for the Route 53 hosted zone."
  value       = var.create_hosted_zone ? aws_route53_zone.main[0].name_servers : []
}

output "domain_name" {
  description = "The domain name for the application."
  value       = var.domain
}