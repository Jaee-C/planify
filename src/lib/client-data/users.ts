import { UserData } from "@/lib/types";

export async function searchUserByUsername(name: string): Promise<UserData[]> {
  if (name.length < 2) {
    return [];
  }
  const data: Response = await fetch("/api/searchuser?username=" + name, {
    method: "GET",
  });

  if (data.status !== 200) {
    throw new Error("Failed to fetch user data");
  }

  const users: UserData[] = await data.json();
  return users;
}

export async function getAllUsersInProject(
  projectKey: string
): Promise<UserData[]> {
  const data: Response = await fetch("/api/" + projectKey + "/users", {
    method: "GET",
  });

  if (data.status !== 200) {
    throw new Error("Failed to fetch user data");
  }

  const users: UserData[] = await data.json();
  return users;
}
