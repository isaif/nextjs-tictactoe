import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UserIDProvider } from "@/hooks/useUserID";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserIDProvider>
      <Component {...pageProps} />
    </UserIDProvider>
  );
}
