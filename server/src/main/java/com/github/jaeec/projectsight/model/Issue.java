package com.github.jaeec.projectsight.model;

import jakarta.persistence.Table;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

@Table(name="ISSUE")
public class Issue {
    @Id
    private String id;
    private String title;
    private String description;
    private String status;
    private User assignee;
    private List<User> allowedUsers = new ArrayList<>();

    public Issue() {
        this.allowedUsers.add(new User());
        this.id = "1";
        this.title = "Issue 1";
        this.description = "This is issue 1";
        this.status = "open";
        this.assignee = allowedUsers.get(0);
    }

    public Issue(String id, String title, String description, String status) {
        this.allowedUsers.add(new User());
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.assignee = allowedUsers.get(0);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAssignee() {
        return assignee.getName();
    }

    public void setAssignee(String assigneeId) {
        for (User user : allowedUsers) {
            if (user.getId().equals(assigneeId)) {
                this.assignee = user;
            }
        }
    }
}
