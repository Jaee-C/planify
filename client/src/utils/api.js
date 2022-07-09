import { issues, projects } from "./sample-data";
import axios from "axios";
const api_url = process.env.REACT_APP_API_URL;

export const fetchIssues = async () => {
  // const data = await axios.get(`${api_url}/issues`);
  return issues;
}

export const fetchProjects = async () => {
  // const data = await axios.get(`${api_url}/projects`);
  // return data
  return projects;
}

export const addIssue = async (issue) => {
  const res = await axios({
    method: "POST",
    url: `${api_url}/issues`,
    data: issue,
  });
  // return res;
}

export const deleteCurrentIssue = async (issueId) => {
  const res = await axios.delete(`${api_url}/issues/${issueId}`, {
    method: "DELETE",
  });
  // return res;
}
