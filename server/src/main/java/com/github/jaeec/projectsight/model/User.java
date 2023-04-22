package com.github.jaeec.projectsight.model;

public class User {
    private String id;
    private String name;
    private String email;
    private String role;
    public User() {
        this.id = "1";
        this.name = "Daniel Chin";
        this.email = "cheche@daniel.org";
        this.role = "owner";
    }

    public String getName() {
        return name;
    }

    public String getId() {
        return id;
    }
}
