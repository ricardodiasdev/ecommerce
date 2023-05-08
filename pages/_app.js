import "@/styles/globals.css";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session} >
      <ToastContainer autoClose={1000} position="bottom-right"/>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
