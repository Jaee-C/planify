package com.github.jaeec.projectsight.repository;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

import com.github.jaeec.projectsight.model.Issue;

import java.util.List;

@Repository
public interface IssueRepository {
    List<Issue> findAllIssues();
}
