import dynamic from "next/dynamic";
import Head from "next/head";

// ✅ Ensure dynamic import uses default import (no `{}`)
const MapLibreMap = dynamic(() => import("../components/maplibre"), {
  ssr: false, // Disable SSR for client-side rendering
});

export default function Home() {
  return (
    <>
      <Head>
        <title>MapLibre in Next.js</title>
        <link
          href="https://unpkg.com/maplibre-gl/dist/maplibre-gl.css"
          rel="stylesheet"
        />
      </Head>
      <MapLibreMap />
    </>
  );
}
