import { useQuery, UseQueryResult } from "react-query";
import { IssueResponse, StatusType } from "@/lib/types";
import { fetchIssueList, fetchStatuses } from "@/lib/data/issues";

export function queryIssues(projectKey: string): UseQueryResult<IssueResponse> {
  return useQuery(["issues", projectKey], () => fetchIssueList(projectKey), {
    enabled: projectKey !== "",
  });
}

export function queryStatuses(
  projectKey: string
): UseQueryResult<StatusType[]> {
  return useQuery(["statuses", projectKey], () => fetchStatuses(projectKey), {
    enabled: projectKey !== "",
  });
}
