import { NextApiRequest, NextApiResponse } from "next";
import userRegister from "@/lib/auth/UserAuth";
import { NewUser } from "@/lib/types/User";

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
    res.send("Username already taken");
    res.end();
    return;
  }

  try {
    await userRegister.saveUser(password, createUser(user));
    res.status(200).send("User created");
    return;
  } catch (err) {
    res.statusCode = 500;
    res.send(JSON.stringify(err));
    return;
  }
}

function createUser(user: any): NewUser {
  let displayName: string;

  if (user.displayName) displayName = user.displayName;
  else if (user.firstName && user.lastName)
    displayName = `${user.firstName} ${user.lastName}`;
  else displayName = user.username;

  return {
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    displayName,
  };
}
