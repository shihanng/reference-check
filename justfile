export OP_ACCOUNT := env("OP_ACCOUNT", "my.1password.com")

decrypt:
    #!/usr/bin/env bash
    set -euxo pipefail
    export SOPS_AGE_KEY_CMD='op item get "Age" --vault=reference-check --field credential --reveal'
    sops -d -i tf/providers_secret.tf
    sops -d -i .clasp.json

encrypt:
    sops -e -i tf/providers_secret.tf
    sops -e -i .clasp.json
