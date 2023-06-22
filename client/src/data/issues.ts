import {UIIssue} from '@/interfaces';

export async function fetchIssueList() {
  const httpResponse = await fetch('/api/issues', {method: 'GET'});
  const projectResponse = await fetch('/api/projectId', {method: 'GET'});

  if (!httpResponse.ok) {
    throw new Error(httpResponse.statusText);
  }
  if (!projectResponse.ok) {
    throw new Error(projectResponse.statusText);
  }

  const projectId = await projectResponse.text();
  const json = await httpResponse.json();
  const result: UIIssue[] = json.map((item: any) => {
    return {
      id: item.id,
      project: projectId,
      title: item.title,
      assignee: item.assignee,
      status: item.status,
    };
  });

  return result;
}
