package com.github.jaeec.projectsight.controller;

import com.github.jaeec.projectsight.exceptions.NotFoundException;
import com.github.jaeec.projectsight.exceptions.PermissionNotAllowedException;
import com.github.jaeec.projectsight.repository.IssueRepository;
import com.github.jaeec.projectsight.service.Issue;
import com.github.jaeec.projectsight.service.IssueRequest;
import com.github.jaeec.projectsight.service.Project;
import net.minidev.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@ResponseStatus(code = HttpStatus.OK)
public class IssueController {
    private final Project project = new Project("1");

    @GetMapping("/issues")
    public List<Issue> getIssues() {
        return project.getAllIssues();
    }

    @PostMapping("/issues/{issueId}")
    public void updateIssue(@PathVariable(value="issueId") int issueId,
                                           @RequestBody JSONObject issue) {
        IssueRequest updatedIssue = new IssueRequest(issue);

        try {
            project.editIssue(issueId, updatedIssue);
        } catch (NotFoundException e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Issue not found", e
            );
        } catch (PermissionNotAllowedException e) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "Permission not allowed", e
            );
        }
    }

    @PostMapping("/issues")
    public void newIssue(@RequestBody JSONObject issue) {
        IssueRequest newIssue = new IssueRequest(issue);

        project.addIssue(newIssue);
    }

    @DeleteMapping("/issues/{issueId}")
    public void deleteIssue(@PathVariable(value="issueId") int issueId) {
        try {
            project.deleteIssue(issueId);
        } catch (NotFoundException e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Issue not found", e
            );
        } catch (PermissionNotAllowedException e) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "Permission not allowed", e
            );
        }
    }
}
