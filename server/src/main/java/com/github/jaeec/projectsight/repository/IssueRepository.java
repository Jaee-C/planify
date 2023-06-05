package com.github.jaeec.projectsight.repository;

import com.github.jaeec.projectsight.service.Issue;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class IssueRepository {
  private List<Issue> issueDb = new ArrayList<>();

  public IssueRepository() {
  }

  public Issue get(String id) {
    for (Issue issue : issueDb) {
      if (issue.getId().equals(id)) {
        return issue;
      }
    }
    return null;
  }

  public List<Issue> getAll() {
    return issueDb;
  }

  public void save(String title, String description, int statusId) {
    String newId = Integer.toString(issueDb.size() + 1);
    Issue temp = new Issue(newId, title, description, statusId);
    issueDb.add(temp);
  }

  public void save(Issue issue) {
    String newId = Integer.toString(issueDb.size() + 1);
    issue.setId(newId);
    issueDb.add(issue);
  }

  public void delete(Issue issue) {
    issueDb.remove(issue);
    return;
  }
}
