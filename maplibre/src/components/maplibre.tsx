"use client"; // Ensures the component runs on the client-side

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const MapLibreMap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://demotiles.maplibre.org/style.json", // Free MapLibre style
      center: [106.8456, -6.2088], // Jakarta
      zoom: 10,
    });

    new maplibregl.Marker().setLngLat([106.8456, -6.2088]).addTo(map);

    return () => map.remove();
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{ width: "100%", height: "100vh" }}
    />
  );
};

export default MapLibreMap; // ✅ Ensure default export
