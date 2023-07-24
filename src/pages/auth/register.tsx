import Head from "next/head";
import RegisterPage from "@/components/RegisterGateway";

export default function Register(): JSX.Element {
  return (
    <>
      <Head>
        <title>Planify: Register</title>
      </Head>
      <div className="h-screen w-screen flex justify-center">
        <RegisterPage />
      </div>
    </>
  );
}
