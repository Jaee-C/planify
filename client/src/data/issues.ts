import {Data} from '@/interfaces';

export async function fetchIssueList() {
  const httpResponse = await fetch('/api/issues', {method: 'GET'});

  if (!httpResponse.ok) {
    throw new Error(httpResponse.statusText);
  }

  const json = await httpResponse.json();
  const result: Data[] = json.map((item: any) => {
    return {
      id: item.id,
      project: item.project,
      title: item.title,
      assignee: item.assignee,
      status: item.status,
    };
  });

  return result;
}
