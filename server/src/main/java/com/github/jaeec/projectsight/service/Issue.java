package com.github.jaeec.projectsight.service;

import org.springframework.data.annotation.Id;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

public class Issue {
    @Id
    private int id;
    private String title;
    private String description;
    private IssueStatus status;
    private User assignee;
    private List<User> allowedUsers = new ArrayList<>();

    public Issue() {
        this.id = 0;
        this.title = "";
        this.description = "";
        this.status = IssueStatus.OPEN;
        this.assignee = null;
    }

    public Issue(int id, String title, String description, int statusId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = IssueStatus.fromInt(statusId);;
        this.assignee = null;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public IssueStatus getStatus() {
        return status;
    }

    public void setStatus(int statusId) {
        this.status = IssueStatus.fromInt(statusId);;
    }

    public User getAssignee() {
        return assignee;
    }

    public void setAssignee(User assignee) {
        for (User user : allowedUsers) {
            if (user.equals(assignee)) {
                this.assignee = user;
            }
        }
    }
}
