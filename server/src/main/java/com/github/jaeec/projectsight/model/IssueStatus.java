package com.github.jaeec.projectsight.model;

public enum IssueStatus {
  OPEN,
  IN_PROGRESS,
  CLOSED;

  public static IssueStatus fromInt(int status) {
    switch (status) {
      case 1:
        return OPEN;
      case 2:
        return IN_PROGRESS;
      case 3:
        return CLOSED;
      default:
        return null;
    }
  }

  public int toInt() {
    switch (this) {
      case OPEN: return 1;
      case IN_PROGRESS: return 2;
      case CLOSED: return 3;
      default: {
        assert false;
      }
    }
    return 0;
  }
}
