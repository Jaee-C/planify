import { NextApiRequest, NextApiResponse } from "next";
import AuthService, { NewUserInput } from "@/server/service/AuthService";
import AppError from "@/server/service/AppError";
import { USER_CREATION_ERROR, USERNAME_TAKEN } from "@/lib/client-data/errors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | undefined>
): Promise<void> {
  const { ...user } = req.body;

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end();
  }

  // Validate if username is already taken
  if (await AuthService.accountExists(user.email)) {
    const error: AppError = new AppError(USERNAME_TAKEN, "Email already taken");
    res.statusCode = 409;
    res.end(error.toJSONString());
    return;
  }

  try {
    await AuthService.createUser(parseUserInput(req));
    res.status(200).send("User created");
    return;
  } catch (err) {
    res.statusCode = 500;

    const error: AppError = AppError.generateAppError(err, USER_CREATION_ERROR);
    res.end(error.toJSONString());
    return;
  }
}

function parseUserInput(req: NextApiRequest): NewUserInput {
  if (
    !req.body.email ||
    !req.body.password ||
    !req.body.firstName ||
    !req.body.lastName
  ) {
    throw new Error("Invalid Inputs");
  }
  return {
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    displayName: req.body.displayName,
  };
}
