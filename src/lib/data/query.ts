import { QueryClient, useQuery, UseQueryResult } from "react-query";
import { Issue, IssueResponse, PriorityType, StatusType } from "@/lib/types";
import {
  fetchIssueList,
  fetchPriorities,
  fetchStatuses,
  getIssue,
} from "@/lib/data/issues";
import { ISSUE_STALE_TIME, STALE_TIME } from "@/lib/constants";

export const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export function queryIssues(projectKey: string): UseQueryResult<IssueResponse> {
  return useQuery(["issues", projectKey], () => fetchIssueList(projectKey), {
    staleTime: ISSUE_STALE_TIME,
  });
}

export function queryIssuesConverted(
  projectKey: string
): UseQueryResult<Issue[]> {
  return useQuery(["issuesConverted", projectKey], () =>
    fetchIssueList(projectKey).then(res => res.data)
  );
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
