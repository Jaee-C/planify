package com.github.jaeec.projectsight.service;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class IssueTests {
  @Test
  void createEmptyIssue() {
    Issue newIssue = new Issue();

    // Empty Issue
    assertEquals(newIssue.getTitle(), "");
    assertEquals(newIssue.getDescription(), "");
    assertEquals(newIssue.getStatus(), IssueStatus.OPEN);
    assertNull(newIssue.getAssignee());

    // Assigning to unallowed user
    User unallowedUser = new User();
    newIssue.setAssignee(unallowedUser);
    assertNull(newIssue.getAssignee());
  }

  @Test
  void newCustomIssueStatusId() {
    Issue newIssue = new Issue("1", "title", "description", 1);

    assertEquals(newIssue.getTitle(), "title");
    assertEquals(newIssue.getDescription(), "description");
    assertEquals(newIssue.getStatus(), IssueStatus.OPEN);
    assertNull(newIssue.getAssignee());
  }
}
