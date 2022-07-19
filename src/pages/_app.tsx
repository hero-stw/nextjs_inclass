import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import instance from "@/api/instance";
import "sweetalert2/src/sweetalert2.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher: async (url) => await instance.get(url) }}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
