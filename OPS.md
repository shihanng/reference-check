# Deployment

## Terraform

We use Terraform to manage the project on the Google Cloud Platform (GCP).

```
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

The following files are encrypted with [SOPS](https://getsops.io/).

```
sops -e -i tf/providers.tf
sops -e -i .clasp.json
```

You need to decrypt it during the development and deployment phase:

```
sops -d tf/providers.tf
sops -d .clasp.json
```
