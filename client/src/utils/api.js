const api_url = process.env.API_URL;

export const fetchIssues = async () => {
  const res = await fetch(`${api_url}/issues`);
  return res.json();
}

export const fetchProjects = async () => {
  const res = await fetch(`${api_url}/projects`);
  return res.json();
}
