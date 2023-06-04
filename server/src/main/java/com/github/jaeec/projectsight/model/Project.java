package com.github.jaeec.projectsight.model;

import com.github.jaeec.projectsight.service.IssueService;

import java.util.ArrayList;
import java.util.List;

public class Project {
  private String id;
  private List<Issue> issues = new ArrayList<>();
  private final IssueService issueService = new IssueService();

  public Project(String id) {
    this.id = id;
    this.issues = new ArrayList<>();   // Fetch issues from database given project id
  }

  public void addIssue(Issue issue) {
    issues.add(issue);
  }

  public Issue findIssue(String id) {
    for (Issue issue : issues) {
      if (issue.getId().equals(id)) {
        return issue;
      }
    }
    return null;
  }

  public void editIssue(String id, IssueRequest request) throws NotFoundException, PermissionNotAllowedException {
    Issue issue = findIssue(id);

    if (issue == null) {
      throw new NotFoundException("Issue not found");
    }

    if (request.title != null) {
      issue.setTitle(request.title);
    }
    if (request.description != null) {
      issue.setDescription(request.description);
    }
    if (request.status != 0) {
      issue.setStatus(request.status);
    }
    if (request.assigneeId != 0) {
      // set assignee
    }

  }

  public List<Issue> getAllIssues() {
    issues = issueService.getAll();
    return issues;
  }

}
