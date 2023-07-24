import Head from "next/head";
import LoginGateway from "@/components/LoginGateway";

export default function SignIn(): JSX.Element {
  return (
    <>
      <Head>
        <title>Planify: Sign In</title>
      </Head>
      <div className="h-screen w-screen flex justify-center">
        <LoginGateway />
      </div>
    </>
  );
}
