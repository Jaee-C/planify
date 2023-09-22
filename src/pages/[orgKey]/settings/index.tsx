import Head from "next/head";

export default function Settings(): JSX.Element {
  return (
    <>
      <Head>
        <header>Settings</header>
      </Head>
      <h1>Settings Page</h1>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>user@test.mail</td>
            <td>Test User</td>
            <td>Edit, Delete</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
