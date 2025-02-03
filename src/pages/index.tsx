import dynamic from "next/dynamic";
import Head from "next/head";

const MapLibreMap = dynamic(() => import("../components/maplibre"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Next.js with MapLibre</title>
        <link href="https://unpkg.com/maplibre-gl/dist/maplibre-gl.css" rel="stylesheet" />
      </Head>
      <MapLibreMap />
    </>
  );
}
