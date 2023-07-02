import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

/**
 * Top level component used to initialise Nextjs pages. Sets up the
 * global context and provides a common layout for all pages in the
 * app.
 *
 * Automatically executed when the page is loaded, and wraps the
 * individual page components.
 *
 * @param Component - The component that is being rendered
 * @param pageProps - Props passed from the page component
 * @returns - The rendered root component
 */
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): JSX.Element {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
