package com.github.jaeec.projectsight.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Repository;

import com.github.jaeec.projectsight.model.Issue;

import java.util.ArrayList;
import java.util.List;

@Repository
public class LocalIssueRepository implements IssueRepository {
    List<Issue> issues = new ArrayList<>();

    public LocalIssueRepository() {
        this.issues.add(new Issue());
    }

    @Override
    public List<Issue> findAllIssues() {
        return issues;
    }
}
