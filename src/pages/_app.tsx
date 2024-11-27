import { UserProvider } from "@/contexts/UserContext";
import prisma from "@/lib/prisma";
import CreateUserPage from "@/setup/CreateUserPage";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  //ensure tailwind is working in both
  return pageProps.users ? (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  ) : (
    <CreateUserPage {...pageProps} />
  );
}

App.getInitialProps = async () => {
  const users = await prisma.users.count();
  return {
    pageProps: {
      users,
    },
  };
};
