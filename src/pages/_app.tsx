import { UserProvider } from "@/contexts/UserContext";
import "@/styles/globals.css";
import "react-quill-new/dist/quill.snow.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
