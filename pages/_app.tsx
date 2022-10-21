import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useRef } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const musRef = useRef<Mus>();

  useEffect(() => {
    // Record 5 seconds of user actions then print the data to console.
    console.log("[mus.js] Create instance");
    musRef.current = new Mus();
    console.log("[mus.js] Start recording");
    musRef.current.record();
    setTimeout(() => {
      console.log("[mus.js] Stop recording");
      if (musRef.current) {
        musRef.current.stop();
        console.log("[mus.js] Data:", musRef.current.getData());
      }
    }, 5000);
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
