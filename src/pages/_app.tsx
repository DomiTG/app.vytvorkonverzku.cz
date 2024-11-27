import { UserProvider } from "@/contexts/UserContext";
import prisma from "@/lib/prisma";
import CreateUserPage from "@/setup/CreateUserPage";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  //ensure tailwind is working in both
  console.log("Vercel:", pageProps.isVercel);
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
  //check if is vercel
  return {
    pageProps: {
      users,
      isVercel: process.env.VERCEL === "1",
    },
  };
};
