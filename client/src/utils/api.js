import { issues, projects } from "./sample-data";
const api_url = process.env.REACT_APP_API_URL;

export const fetchIssues = async () => {
  // const res = await fetch(`${api_url}/issues`);
  return issues;
}

export const fetchProjects = async () => {
  // const res = await fetch(`${api_url}/projects`);
  // return res.json()
  console.log("fetchProjects");
  return projects;
}

export const addIssue = async (issue) => {
  const res = await fetch(`${api_url}/issues`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(issue),
  });
  // return res.json();
}
