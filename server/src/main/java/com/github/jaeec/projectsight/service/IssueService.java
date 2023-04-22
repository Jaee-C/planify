package com.github.jaeec.projectsight.service;

import java.util.Collection;
import java.util.HashMap;
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

    public Collection<Issue> getAll() {
        return issueDb.values();
    }

    public void save(String title, String description, String status) {
        String newId = Integer.toString(issueDb.size() + 1);
        Issue temp = new Issue(newId, title, description, status);
        issueDb.put(temp.getId(), temp);
    }
}
