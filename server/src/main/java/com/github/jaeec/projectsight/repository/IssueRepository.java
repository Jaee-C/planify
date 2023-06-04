package com.github.jaeec.projectsight.repository;

import com.github.jaeec.projectsight.service.Issue;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class IssueRepository {
  private Map<String, Issue> issueDb = new HashMap<>();

  public IssueRepository() {
    Issue temp = new Issue();
    issueDb.put(temp.getId(), temp);
  }

  public Issue get(String id) {
    return issueDb.get(id);
  }

  public List<Issue> getAll() {
    return issueDb.values().stream().toList();
  }

  public void save(String title, String description, int statusId) {
    String newId = Integer.toString(issueDb.size() + 1);
    Issue temp = new Issue(newId, title, description, statusId);
    issueDb.put(temp.getId(), temp);
  }
}
