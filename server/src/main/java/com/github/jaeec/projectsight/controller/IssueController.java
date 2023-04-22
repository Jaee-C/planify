package com.github.jaeec.projectsight.controller;

import com.github.jaeec.projectsight.model.Issue;
import com.github.jaeec.projectsight.repository.IssueRepository;
import com.github.jaeec.projectsight.repository.LocalIssueRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class IssueController {
    private final IssueRepository issueRepository = new LocalIssueRepository();

    @GetMapping("/issues")
    public List<Issue> getIssues() {
        return issueRepository.findAllIssues();
    }
}
