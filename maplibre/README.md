# Next.js + MapLibre GL JS Setup Guide

Next.js is a React framework that supports both server-side rendering (SSR) and client-side rendering. MapLibre GL JS is an open-source library for displaying interactive maps. This tutorial will guide you through integrating MapLibre with Next.js.

## 🚀 Features
- Uses **Next.js 14 + TypeScript**
- Displays **interactive maps** with MapLibre GL JS
- Adds **custom markers**
- Optimized with **Dynamic Import (without SSR)**
- Modular structure with **separate components**

## 📂 Project Structure
```
nextjs-maplibre/
│── public/
│── src/
│   ├── components/
│   │   ├── MapLibreMap.tsx  # Map component
│   ├── pages/
│   │   ├── index.tsx        # Main page
│── package.json
│── next.config.ts
│── tsconfig.json
│── README.md
```

## 🛠️ Setup Next.js & MapLibre
1. Create a Next.js project:
   ```sh
   npx create-next-app@latest nextjs-maplibre --typescript
   cd nextjs-maplibre
   ```
2. Install **MapLibre GL JS**:
   ```sh
   npm install maplibre-gl
   npm install --save-dev @types/maplibre-gl
   ```

## 🎯 Create the MapLibre Component
Create a file `src/components/MapLibreMap.tsx` and add the following code:
```tsx
"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const MapLibreMap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [106.8456, -6.2088], // Jakarta
      zoom: 10,
    });

    new maplibregl.Marker().setLngLat([106.8456, -6.2088]).addTo(map);

    return () => map.remove();
  }, []);

  return <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />;
};

export default MapLibreMap;
```

## 📌 Use the Map Component in Next.js Page
Edit `src/pages/index.tsx`:
```tsx
import dynamic from "next/dynamic";
import Head from "next/head";

const MapLibreMap = dynamic(() => import("../components/MapLibreMap"), {
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
```

## 🔧 Run the Project
Run the following command:
```sh
npm run dev
```
Open your browser and access: [http://localhost:3000](http://localhost:3000)

## 🎨 Customization
1. **Change the initial map location**
   ```tsx
   center: [longitude, latitude],
   ```
2. **Set initial zoom level**
   ```tsx
   zoom: 12,
   ```
3. **Use a custom map tile**
   ```tsx
   style: "https://api.maptiler.com/maps/streets/style.json?key=YOUR_API_KEY",
   ```

## ❓ Troubleshooting
1. **Map does not appear**
   - Check for errors in **Console (`F12` → Console)**
   - Ensure **tile provider URL** is correct.
   
2. **Module not found (`Cannot find module`)**
   - Ensure `MapLibreMap.tsx` exists in the `components/` folder.
   - Restart the server:
     ```sh
     npm run dev
     ```

## 🚀 Deploy to Vercel
```sh
npm install -g vercel
vercel
```

## 📜 References
- 🔗 [MapLibre Documentation](https://maplibre.org/maplibre-gl-js-docs/)
- 🔗 [Next.js Documentation](https://nextjs.org/docs)

Your **Next.js + MapLibre** project is now ready to use! 🚀😊

