terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }

    google = {
      source  = "hashicorp/google"
      version = "~> 6.12"
    }
  }
}

provider "cloudflare" {}

provider "github" {
  owner = "shihanng"
}
