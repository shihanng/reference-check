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

publish:
    #!/usr/bin/env bash
    set -euo pipefail
    if clasp list > /dev/null 2>&1; then
      echo "✅ Already logged in"
    else
      echo "🔐 No credentials found"
      clasp login
    fi
    clasp push

tf +ARGS:
    #!/usr/bin/env bash
    set -euo pipefail
    export CLOUDFLARE_API_TOKEN=$(op item get "CLOUDFLARE_API_TOKEN" --vault=reference-check --field credential --reveal)
    terraform -chdir=tf {{ ARGS }}
