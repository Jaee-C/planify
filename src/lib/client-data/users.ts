import { UserData } from "@/lib/types";

export async function searchUserByUsername(
  projectKey: string,
  name: string
): Promise<UserData[]> {
  if (name.length < 2) {
    return [];
  }
  const data: Response = await fetch(
    `/api/${projectKey}/searchuser?username=${name}`,
    {
      method: "GET",
    }
  );

  if (data.status !== 200) {
    throw new Error("Failed to fetch user data");
  }

  const users: UserData[] = await data.json();
  return users;
}

export async function addProjectUser(
  projectKey: string,
  user: UserData
): Promise<unknown> {
  const data: Response = await fetch("/api/" + projectKey + "/users", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (data.status !== 200) {
    throw new Error("Failed to add user to project");
  }

  return;
}

export async function getAllUsersInProject(
  organisation: string,
  projectKey: string
): Promise<UserData[]> {
  const data: Response = await fetch(
    `/api/${organisation}/${projectKey}/users1`,
    {
      method: "GET",
    }
  );

  if (data.status !== 200) {
    throw new Error("Failed to fetch user data");
  }

  const users: UserData[] = await data.json();
  return users;
}
