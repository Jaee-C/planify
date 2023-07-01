import { useSession } from "next-auth/react";

export default function Protected(): JSX.Element {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <p>You can view this page because you are signed in.</p>
    </div>
  );
}
