"use client";

import { queryProjectUsers } from "@/lib/client-data/query";
import { NextRouter, useRouter } from "next/router";
import { verifyUrlParam } from "@/lib/utils";
import { UserData } from "@/lib/types";

export default function MembersList(): JSX.Element {
  const router: NextRouter = useRouter();
  const projectKey: string = verifyUrlParam(router.query.pKey);
  const { data, isLoading } = queryProjectUsers(projectKey);

  if (isLoading) return <></>;

  return (
    <div>
      <ul>
        {data?.map((user: UserData) => (
          <li>
            Display Name: {user.displayName}; username: {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
}
