import { DefaultSession } from "next-auth";
import { User as LocalUser } from "@/lib/types/User";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's display name. */
      name: string;
    } & DefaultSession["user"];
  }

  interface User extends LocalUser {}
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
  }
}
