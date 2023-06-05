package com.github.jaeec.projectsight.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class ProjectTests {

  @Test
  void createEmptyProject() {
    Project newProject = new Project("1");

    // Empty Project
    assertEquals(newProject.getAllIssues().size(), 0);
  }

  @Test
  void addIssueToProject() {
    Project newProject = new Project("1");
    Issue newIssue = new Issue("1", "title", "description", 1);
    newProject.addIssue(newIssue);

    // Empty Project
    assertEquals(newProject.getAllIssues().size(), 1);
  }

  @Test
  void editValidIssueInProject() {
    Project newProject = new Project("1");
    Issue newIssue = new Issue("1", "title", "description", 1);
    newProject.addIssue(newIssue);
    IssueRequest request = new IssueRequest();
    request.title = "new title";
    request.description = "new description";
    request.status = IssueStatus.IN_PROGRESS.toInt();
    request.assigneeId = 1;

    assertAll(() ->newProject.editIssue("1", request));
    assertEquals(newProject.getAllIssues().size(), 1);

    Issue editedIssue = newProject.findIssue("1");
    assertEquals(editedIssue.getTitle(), "new title");
    assertEquals(editedIssue.getDescription(), "new description");
    assertEquals(editedIssue.getStatus(), IssueStatus.IN_PROGRESS);
  }
}
