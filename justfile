decrypt:
    #!/usr/bin/env bash
    set -euxo pipefail
    sops -d -i tf/providers_secret.tf
    sops -d -i .clasp.json

encrypt:
    sops -e -i tf/providers_secret.tf
    sops -e -i .clasp.json
