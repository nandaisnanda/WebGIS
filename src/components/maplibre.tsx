"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import BaseMapSwitcher from "./basemapswitcher";
import SearchLocation from "./searchlocation";
import CatalogLayer from "./cataloglayer";
import SketchTool from "./sketchtool";

const MapLibre = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://demotiles.maplibre.org/style.json", // Default OSM basemap
      center: [106.8456, -6.2088], // Jakarta
      zoom: 10,
    });

    setMapInstance(map);
    return () => map.remove();
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
      {mapInstance && <BaseMapSwitcher map={mapInstance} />}
      {mapInstance && <SearchLocation map={mapInstance} />}
      {mapInstance && <CatalogLayer map={mapInstance} />}
      {mapInstance && <SketchTool map={mapInstance} />}
    </div>
  );
};

export default MapLibre;
