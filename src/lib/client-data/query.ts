import { QueryClient, useQuery, UseQueryResult } from "react-query";
import {
  IssueSummarisedData,
  PriorityType,
  StatusType,
  UserData,
} from "@/lib/types";
import {
  fetchIssueList,
  fetchPriorities,
  fetchStatuses,
  getIssue,
} from "@/lib/client-data/issues";
import { ISSUE_STALE_TIME, STALE_TIME } from "@/lib/constants";
import { Issue } from "@/lib/shared";
import { getAllUsersInProject } from "@/lib/client-data/users";

export const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export function queryIssues(
  projectKey: string
): UseQueryResult<IssueSummarisedData[]> {
  return useQuery(["issues", projectKey], () => fetchIssueList(projectKey), {
    staleTime: ISSUE_STALE_TIME,
  });
}

export function queryIssuesConverted(
  projectKey: string
): UseQueryResult<IssueSummarisedData[]> {
  return useQuery(["issuesConverted", projectKey], () =>
    fetchIssueList(projectKey).then(res => res)
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
): UseQueryResult<Issue> {
  return useQuery(["issue", projectKey, issueKey], () =>
    getIssue(projectKey, issueKey)
  );
}

export function queryProjectUsers(
  projectKey: string
): UseQueryResult<UserData[]> {
  return useQuery(["projectUsers", projectKey], () =>
    getAllUsersInProject(projectKey)
  );
}
