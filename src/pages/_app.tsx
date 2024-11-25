import "@/styles/globals.css";
import SetupComponent from "@/technicality/SetupComponent";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  console.log(pageProps);
  return pageProps.needSetup ? (
    <SetupComponent neededEnvs={pageProps.neededEnvs as string[]} />
  ) : (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
App.getInitialProps = async () => {
  const envs = process.env;
  const neededEnvs = ["NEXTAUTH_SECRET", "NEXTAUTH_URL", "DATABASE_URL"];
  const needSetup = neededEnvs.some((env) => !envs[env]);
  return {
    pageProps: {
      needSetup,
      neededEnvs,
    },
  };
};
