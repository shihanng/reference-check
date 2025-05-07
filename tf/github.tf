module "github" {
  source     = "github.com/shihanng/tf-github-repo?ref=v0.1.0"
  repository = "reference-check"
}

moved {
  from = github_issue_label.priority_low
  to   = module.github.github_issue_label.priority_low
}

moved {
  from = github_issue_label.priority_med
  to   = module.github.github_issue_label.priority_med
}

moved {
  from = github_issue_label.priority_high
  to   = module.github.github_issue_label.priority_high
}

moved {
  from = github_issue_label.type_bug
  to   = module.github.github_issue_label.type_bug
}

moved {
  from = github_issue_label.type_enhancement
  to   = module.github.github_issue_label.type_enhancement
}

moved {
  from = github_issue_label.type_proposal
  to   = module.github.github_issue_label.type_proposal
}

moved {
  from = github_issue_label.type_task
  to   = module.github.github_issue_label.type_task
}
