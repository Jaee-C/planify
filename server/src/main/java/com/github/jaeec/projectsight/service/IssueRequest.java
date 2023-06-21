package com.github.jaeec.projectsight.service;

import net.minidev.json.JSONObject;

public class IssueRequest {
  public String title;
  public String description;
  public int status;
  public int assigneeId;

  public IssueRequest() {
    title = "";
    description = "";
    status = 0;
    assigneeId = 0;
  }

  public IssueRequest(JSONObject request) {
    // Parse JSON request
    if (request.containsKey("title"))
      title = (String) request.get("title");
    if (request.containsKey("description"))
      description = (String) request.get("description");
    if (request.containsKey("status"))
      status = Integer.parseInt((String) request.get("status"));
    if (request.containsKey("assignee"))
      assigneeId = Integer.parseInt((String) request.get("assignee"));
  }
}
