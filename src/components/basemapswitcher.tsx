import React, { useState } from "react";
import maplibregl from "maplibre-gl";

const basemaps: Record<string, string> = {
    OpenStreetMap: "https://demotiles.maplibre.org/style.json",
    CartoLight: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
    CartoDark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
    StadiaAlidadeSmooth: "https://tiles.stadiamaps.com/styles/alidade_smooth.json",
    StadiaOutdoors: "https://tiles.stadiamaps.com/styles/outdoors.json",
    
};

interface BaseMapSwitcherProps {
  map: maplibregl.Map | null;
}

const BaseMapSwitcher: React.FC<BaseMapSwitcherProps> = ({ map }) => {
  const [currentBasemap, setCurrentBasemap] = useState("OpenStreetMap");

  const switchBasemap = (newBasemap: keyof typeof basemaps) => {
    if (map && basemaps[newBasemap]) {
      map.setStyle(basemaps[newBasemap]);
      setCurrentBasemap(newBasemap);
    }
  };

  return (
    <div style={{ position: "absolute", top: 10, left: 10, background: "white", padding: 10, borderRadius: 5 }}>
      <label><strong>Switch Basemap:</strong></label>
      <select onChange={(e) => switchBasemap(e.target.value as keyof typeof basemaps)} style={{ marginLeft: 5, padding: 5 }}>
        {Object.keys(basemaps).map((key) => (
          <option key={key} value={key}>{key}</option>
        ))}
      </select>
    </div>
  );
};

export default BaseMapSwitcher;
