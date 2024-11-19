resource "google_project_service" "apps_script" {
  service = "script.googleapis.com"

  disable_on_destroy = true
}

data "cloudflare_zone" "shihan-dev" {
  name = "shihan.dev"
}

locals {
  record_name = "reference-check"
}

resource "cloudflare_record" "reference-check" {
  zone_id = data.cloudflare_zone.shihan-dev.id
  name    = local.record_name
  content = "shihanng.github.io"
  type    = "CNAME"
  ttl     = 3600
  proxied = false
}
