import bcrypt from "bcrypt";
import { SessionUser } from "@/lib/types";
import UserRepository from "@/server/dao/UserRepository";

const SALT_ROUNDS = 10;

export default {
  verifyUser,
  createUser,
  updatePassword,
};

async function verifyUser(email: string, password: string) {
  const user = await UserRepository.fetchUserIfExists(email);

  if (!user) {
    return null;
  }

  if (await bcrypt.compare(password, user.password)) {
    return toSessionUser(user);
  }
  return null;
}

async function createUser(email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  await UserRepository.createUser(email, hashedPassword);
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
