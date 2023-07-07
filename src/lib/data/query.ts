import { useQuery, UseQueryResult } from "react-query";
import { Issue, IssueResponse, PriorityType, StatusType } from "@/lib/types";
import {
  fetchIssueList,
  fetchPriorities,
  fetchStatuses,
  getIssue,
} from "@/lib/data/issues";
import { STALE_TIME } from "@/lib/constants";

export function queryIssues(projectKey: string): UseQueryResult<IssueResponse> {
  return useQuery(["issues", projectKey], () => fetchIssueList(projectKey));
}

export function queryStatuses(
  projectKey: string
): UseQueryResult<StatusType[]> {
  return useQuery(["statuses", projectKey], () => fetchStatuses(projectKey), {
    enabled: projectKey !== "",
    staleTime: STALE_TIME,
  });
}

export function queryPriorities(
  projectKey: string
): UseQueryResult<PriorityType[]> {
  return useQuery(
    ["priorities", projectKey],
    () => fetchPriorities(projectKey),
    {
      staleTime: STALE_TIME,
    }
  );
}

export function queryIssue(
  projectKey: string,
  issueKey: string
): UseQueryResult<Issue | undefined> {
  return useQuery(["issue", projectKey, issueKey], () =>
    getIssue(projectKey, issueKey)
  );
}
