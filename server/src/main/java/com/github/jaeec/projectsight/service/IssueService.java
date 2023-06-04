package com.github.jaeec.projectsight.service;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.github.jaeec.projectsight.model.Issue;

@Service
public class IssueService {
    private Map<String, Issue> issueDb = new HashMap<>();

    public IssueService() {
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
