import React, { useEffect } from "react";
import MapLibreGlDraw from "@maplibre/maplibre-gl-draw";
import maplibregl from "maplibre-gl";

interface SketchToolProps {
  map: maplibregl.Map | null;
}

const SketchTool: React.FC<SketchToolProps> = ({ map }) => {
  useEffect(() => {
    if (!map) return;

    // Initialize the drawing tool
    const draw = new MapLibreGlDraw({
      displayControlsDefault: false,
      controls: {
        point: true,
        line_string: true,
        polygon: true,
        trash: true,
      },
    });

    // Add the drawing tool to the map
    map.addControl(draw, "top-left");

    return () => {
      map.removeControl(draw);
    };
  }, [map]);

  return null; // This component only adds the drawing tool to the map
};

export default SketchTool;
