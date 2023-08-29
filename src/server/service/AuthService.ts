import bcrypt from "bcrypt";
import { SessionUser } from "@/lib/types";
import UserRepository from "@/server/dao/UserRepository";

const SALT_ROUNDS = 10;

export default {
  verifyUser,
  createUser,
  updatePassword,
  accountExists,
};

export interface NewUserInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  displayName?: string;
}

async function verifyUser(email: string, password: string) {
  try {
    const user = await UserRepository.fetchUserIfExists(email);

    if (!user) {
      return null;
    }

    if (await bcrypt.compare(password, user.password)) {
      return toSessionUser(user);
    }
  } catch (e) {
    return null;
  }
  return null;
}

async function accountExists(email: string): Promise<boolean> {
  try {
    const user = await UserRepository.fetchUserIfExists(email);

    return user !== null;
  } catch (e) {
    return false;
  }
}

async function createUser(input: NewUserInput) {
  input.password = await bcrypt.hash(input.password, SALT_ROUNDS);

  await UserRepository.createUser(input);
}

async function updatePassword(email: string, oldP: string, newP: string) {
  const user = await UserRepository.fetchUserIfExists(email);

  if (!user) {
    return false;
  }

  try {
    if (await bcrypt.compare(oldP, user.password)) {
      await UserRepository.updatePassword(email, newP);
      return true;
    }
  } catch (e) {
    return false;
  }
  return false;
}

function toSessionUser(data: any): SessionUser {
  return {
    id: data.id,
    email: data.email,
  };
}
