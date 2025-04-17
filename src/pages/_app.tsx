import React from "react";
import "../styles/global.css";
import { AppProps } from "next/app";
import { AppContextProvider } from "../context/app-context";
import Layout, { ThemeProvider } from "../components/Layout";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Layout>
        <AppContextProvider>
          <Component {...pageProps} />
        </AppContextProvider>
      </Layout>
    </ThemeProvider>
  );
}
