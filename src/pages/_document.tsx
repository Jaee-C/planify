import { Html, Head, Main, NextScript } from "next/document";

/**
 * This function is used to create a custom document for the Next.js app. It allows
 * for the manipulation of the <head> and <body> elements of the document, and
 * provides a way to add custom styles and scripts.
 *
 * @return {ReactElement} - Returns a React element that represents the custom document
 */
export default function Document(): JSX.Element {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
