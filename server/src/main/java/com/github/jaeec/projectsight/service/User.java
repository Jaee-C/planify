package com.github.jaeec.projectsight.service;

import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) && Objects.equals(name, user.name) && Objects.equals(email, user.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, email);
    }
}
