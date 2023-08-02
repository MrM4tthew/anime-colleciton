import { Global, css } from "@emotion/react";
import type { AppProps } from "next/app";

const GlobalCSS = css`
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap");

  body {
    padding: 0;
    margin: 0;
    font-family: "Poppins", sans-serif;
  }

  a {
    text-decoration: none;
    color: black;
  }

  ul {
    padding: 0;
  }

  .set-width {
    max-width: 900px;
    width: calc(100vw - 2rem);
  }

  .container-title {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 17px;
    opacity: 0.7;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Global styles={GlobalCSS} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;