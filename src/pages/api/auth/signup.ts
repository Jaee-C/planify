import { NextApiRequest, NextApiResponse } from "next";
import AuthService from "@/server/service/AuthService";
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
    await AuthService.createUser(user.email, user.password);
    res.status(200).send("User created");
    return;
  } catch (err) {
    res.statusCode = 500;

    const error: AppError = AppError.generateAppError(err, USER_CREATION_ERROR);
    res.end(error.toJSONString());
    return;
  }
}
