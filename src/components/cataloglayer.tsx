import React, { useState } from "react";
import maplibregl from "maplibre-gl";

interface CatalogLayerProps {
  map: maplibregl.Map | null;
}

const layers = [
  {
    id: "rdtr-zonasi",
    name: "RDTR Zonasi",
    url: "https://tataruang.jakarta.go.id/server/rest/services/RDTR/ZONASI_RDTR/MapServer/tile/{z}/{y}/{x}",
  },
  {
    id: "batas-kelurahan",
    name: "Batas Kelurahan",
    url: "https://jakartasatu.jakarta.go.id/server/rest/services/JakartaSatu/batas_kelurahan_vs_dukcapil/MapServer/tile/{z}/{y}/{x}",
  },
  {
    id: "uhi",
    name: "Urban Heat Island",
    url: "https://jakartasatu.jakarta.go.id/server/rest/services/UHI/MapServer/tile/{z}/{y}/{x}",
  },
  {
    id: "gerakan-tanah",
    name: "Gerakan Tanah",
    url: "https://jakartasatu.jakarta.go.id/server/rest/services/Gerakan_Tanah/Potensi_Gerakan_Tanah/MapServer/tile/{z}/{y}/{x}",
  },
];

const CatalogLayer: React.FC<CatalogLayerProps> = ({ map }) => {
  const [activeLayer, setActiveLayer] = useState<string>("");

  const switchLayer = (layerId: string) => {
    if (!map) return;

    const selectedLayer = layers.find((l) => l.id === layerId);
    if (!selectedLayer) return;

    // Remove any existing layer and source before adding a new one
    if (activeLayer && map.getLayer(activeLayer)) {
      map.removeLayer(activeLayer);
      map.removeSource(activeLayer);
    }

    // Add the selected layer
    map.addSource(layerId, {
      type: "raster",
      tiles: [selectedLayer.url],
      tileSize: 256,
    });

    map.addLayer({
      id: layerId,
      type: "raster",
      source: layerId,
      paint: {},
    });

    setActiveLayer(layerId);
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: 10,
        left: 10,
        background: "white",
        padding: 10,
        borderRadius: 5,
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        zIndex: 1000, // Ensure it appears above the map
      }}
    >
      <label>
        <strong>Choose a Map Layer:</strong>
      </label>
      <select
        value={activeLayer}
        onChange={(e) => switchLayer(e.target.value)}
        style={{
          marginLeft: 5,
          padding: 5,
          width: "100%",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      >
        <option value="">-- Select Layer --</option>
        {layers.map((layer) => (
          <option key={layer.id} value={layer.id}>
            {layer.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CatalogLayer;
