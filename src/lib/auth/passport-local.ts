import Local from "passport-local";
import userAuth from "@/server/service/UserAuth";
import { User } from "next-auth";

export const localStrategy: Local.Strategy = new Local.Strategy(function (
  username: string,
  password: string,
  done
): void {
  userAuth
    .verifyUser(username, password)
    .then((user: User | null) => {
      if (user) {
        console.log(`User: ${user}`);
        done(null, user);
      } else {
        done(new Error("Invalid username and password combination"));
      }
    })
    .catch(err => {
      done(err);
    });
});
