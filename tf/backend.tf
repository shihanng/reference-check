terraform {
  cloud {
    organization = "shihan"

    workspaces {
      name = "reference-check"
    }
  }
}
