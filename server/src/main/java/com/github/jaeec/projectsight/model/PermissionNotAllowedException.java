package com.github.jaeec.projectsight.model;

public class PermissionNotAllowedException extends Exception {
  public PermissionNotAllowedException(String message) {
    super(message);
  }
}
