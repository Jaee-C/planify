package com.github.jaeec.projectsight.controller;

import com.github.jaeec.projectsight.model.Issue;
import com.github.jaeec.projectsight.service.IssueService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
public class IssueController {
    private final IssueService issueService = new IssueService();

    @GetMapping("/issues")
    public Collection<Issue> getIssues() {
        return issueService.getAll();
    }
}
