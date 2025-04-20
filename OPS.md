# Deployment

## Terraform

We use Terraform to manage the project on the Google Cloud Platform (GCP), etc. We use `gcloud` CLI to authenticate with GCP. See [here](https://registry.terraform.io/providers/hashicorp/google/latest/docs/guides/getting_started#configuring-the-provider) for more information. We use [GitHub CLI to authenticate](https://registry.terraform.io/providers/integrations/github/latest/docs) with GitHub. We also use `terraform login` to authenticate for our Terraform backend.

```
export CLOUDFLARE_API_TOKEN=xxx
terraform login
terraform plan
```

The "[OAuth consent screen](https://developers.google.com/apps-script/guides/cloud-platform-projects)" is required for this project, but we cannot use Terraform to manage it at this point in writing.

## clasp

We use [clasp](https://github.com/google/clasp) to manage the project in Google Apps Script.

```
clasp login
clasp push
```

# SOPS

The some files are encrypted with [SOPS](https://getsops.io/).
You need to decrypt it during the development and deployment phase:

```
just encrypt
just decrypt
```
