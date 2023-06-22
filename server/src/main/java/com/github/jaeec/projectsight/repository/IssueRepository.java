package com.github.jaeec.projectsight.repository;

import com.github.jaeec.projectsight.service.Issue;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class IssueRepository {
  private final List<Issue> issueDb = new ArrayList<>();

  public IssueRepository() {
    issueDb.add(new Issue(1, "Create PoC", "PoC", 1));
    issueDb.add(new Issue(2, "Raise Issues", "PoC", 1));
    issueDb.add(new Issue(3, "Record all issues", "PoC", 1));
    issueDb.add(new Issue(4, "Manage Issues", "PoC", 1));
    issueDb.add(new Issue(5, "Notify Users", "PoC", 1));
  }

  public Issue get(int id) {
    for (Issue issue : issueDb) {
      if (issue.getId() == id) {
        return issue;
      }
    }
    return null;
  }

  public List<Issue> getAll() {
    return issueDb;
  }

  public void save(String title, String description, int statusId) {
    int newId = issueDb.size() + 1;
    Issue temp = new Issue(newId, title, description, statusId);
    issueDb.add(temp);
  }

  public void save(Issue issue) {
    int newId = issueDb.size() + 1;
    issue.setId(newId);
    issueDb.add(issue);
  }

  public void delete(int id) {
    Issue issue = get(id);
    issueDb.remove(issue);
  }
}
