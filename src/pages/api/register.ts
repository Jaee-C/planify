import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/lib/interfaces";
import userRegister from "@/server/service/UserAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | undefined>
): Promise<void> {
  const { password, ...user } = req.body;

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end();
  }

  // Validate if username is already taken
  if (await userRegister.checkUsernameExists(user.username)) {
    res.statusCode = 409;
    res.end("Username already taken");
  }

  try {
    await userRegister.saveUser(password, createUser(user));
    res.statusCode = 200;
    res.end("User created");
  } catch (err) {
    res.statusCode = 500;
    res.end(JSON.stringify(err));
  }
}

function createUser(user: any): User {
  const displayName: string = user.displayName
    ? user.displayName
    : user.username;

  return {
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    displayName,
  };
}
