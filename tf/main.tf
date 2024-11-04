resource "google_project_service" "apps_script" {
  service = "script.googleapis.com"

  disable_on_destroy = true
}
