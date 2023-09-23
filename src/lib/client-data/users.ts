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
    `/api/${organisation}/${projectKey}/users`,
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

export async function getAllUsersInOrganisation(
  organisation: string
): Promise<UserData[]> {
  const res: Response = await fetch(`/api/${organisation}/users`, {
    method: "GET",
  });

  if (res.status !== 200) {
    throw new Error("Failed to fetch user data");
  }

  const data = await res.json();
  const users: UserData[] = [];
  for (const entry of data) {
    users.push({
      id: entry.id,
      email: entry.email,
      displayName: entry.displayName,
    });
  }
  return users;
}

export async function inviteUser(
  organisation: string,
  data: any
): Promise<void> {
  const res = await fetch(`/api/${organisation}/users`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    console.error("Failed to invite user.");
  }
}

export async function removeUser(
  organisation: string,
  email: string
): Promise<void> {
  const res = await fetch(`/api/${organisation}/users`, {
    method: "DELETE",
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const fail = await res.json();
    throw new Error(fail.message);
  }
}
