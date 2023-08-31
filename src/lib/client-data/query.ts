import { QueryClient, useQuery, UseQueryResult } from "react-query";
import { IssueData, PriorityType, StatusType, UserData } from "@/lib/types";
import {
  fetchIssueList,
  fetchPriorities,
  fetchStatuses,
  getIssue,
} from "@/lib/client-data/issues";
import { ISSUE_STALE_TIME, STALE_TIME } from "@/lib/constants";
import { Issue } from "@/lib/shared";
import { getAllUsersInProject } from "@/lib/client-data/users";
import Organisation from "@/lib/types/data/Organisation";

export const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export function queryIssues(
  organisation: string,
  projectKey: string
): UseQueryResult<IssueData[]> {
  return useQuery(
    ["issues", projectKey],
    () => fetchIssueList(organisation, projectKey),
    {
      staleTime: ISSUE_STALE_TIME,
    }
  );
}

export function queryIssuesConverted(
  organisation: string,
  projectKey: string
): UseQueryResult<IssueData[]> {
  return useQuery(["issuesConverted", projectKey], () =>
    fetchIssueList(organisation, projectKey).then(res => res)
  );
}

export function queryStatuses(
  organisation: string,
  projectKey: string
): UseQueryResult<StatusType[]> {
  return useQuery(
    ["statuses", projectKey],
    () => fetchStatuses(organisation, projectKey),
    {
      enabled: projectKey !== "",
      staleTime: STALE_TIME,
    }
  );
}

export function queryPriorities(
  organisation: string,
  projectKey: string
): UseQueryResult<PriorityType[]> {
  return useQuery(
    ["priorities", projectKey],
    () => fetchPriorities(organisation, projectKey),
    {
      staleTime: STALE_TIME,
    }
  );
}

export function queryIssue(
  organisation: string,
  projectKey: string,
  issueKey: string
): UseQueryResult<Issue> {
  return useQuery(["issue", projectKey, issueKey], () =>
    getIssue(organisation, projectKey, issueKey)
  );
}

export function queryProjectUsers(
  organisation: string,
  projectKey: string
): UseQueryResult<UserData[]> {
  return useQuery(["projectUsers", projectKey], () =>
    getAllUsersInProject(organisation, projectKey)
  );
}

export function queryOrganisations(): UseQueryResult<Organisation[]> {
  return useQuery(["organisations"], async () => {
    const res = await fetch("/api/organisation", {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Failed to get user's organsations");
    }

    return res.json();
  });
}
