package com.github.jaeec.projectsight.service;

import com.github.jaeec.projectsight.exceptions.NotFoundException;
import com.github.jaeec.projectsight.exceptions.PermissionNotAllowedException;
import com.github.jaeec.projectsight.repository.IssueRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

public class Project {
  private String projectId;
  private List<Issue> issues;
  private IssueRepository issueRepository = new IssueRepository();

  public Project(String projectId) {
    this.projectId = projectId;
    this.issues = new ArrayList<>();   // Fetch issues from database given project id
  }

  public void addIssue(Issue issue) {
    issues.add(issue);
    issueRepository.save(issue);
  }

  public Issue findIssue(int id) {
    for (Issue issue : issues) {
      if (issue.getId() == id) {
        return issue;
      }
    }
    return null;
  }

  public void editIssue(int id, IssueRequest request) throws NotFoundException, PermissionNotAllowedException {
    Issue issue = findIssue(id);
    if (issue == null) {
      throw new NotFoundException("Issue not found");
    }

    createIssue(request, issue);
    issueRepository.save(issue);
  }

  public void addIssue(IssueRequest request) {
    int newId = issues.size() + 1;
    Issue newIssue = new Issue();
    createIssue(request, newIssue);
    newIssue.setId(newId);
    issueRepository.save(newIssue);
  }

  private void createIssue(IssueRequest request, Issue newIssue) {
    if (request.title != null) {
      newIssue.setTitle(request.title);
    }
    if (request.description != null) {
      newIssue.setDescription(request.description);
    }
    if (request.status != 0) {
      newIssue.setStatus(request.status);
    }
    if (request.assigneeId != 0) {
      // set assignee
    }
  }

  public void deleteIssue(int id) throws NotFoundException, PermissionNotAllowedException {
    issueRepository.delete(id);
  }

  public List<Issue> getAllIssues() {
    issues = issueRepository.getAll();
    return issues;
  }

}
