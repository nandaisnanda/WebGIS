import React, { useState } from "react";
import maplibregl from "maplibre-gl";

interface SearchLocationProps {
  map: maplibregl.Map | null;
}

const SearchLocation: React.FC<SearchLocationProps> = ({ map }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
    );
    const data = await response.json();
    setResults(data);
  };

  const moveToLocation = (lng: number, lat: number) => {
    if (map) {
      map.flyTo({ center: [lng, lat], zoom: 12 });

      // Remove existing marker if it exists
      const existingMarker = map.getLayer("search-marker");
      if (existingMarker) {
        map.removeLayer("search-marker");
        map.removeSource("search-marker");
      }

      // Add marker
      map.addSource("search-marker", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: { type: "Point", coordinates: [lng, lat] },
              properties: {},
            },
          ],
        },
      });

      map.addLayer({
        id: "search-marker",
        type: "symbol",
        source: "search-marker",
        layout: {
          "icon-image": "marker-15",
        },
      });
    }
  };

  return (
    <div style={{ position: "absolute", top: 10, right: 10, background: "white", padding: 10, borderRadius: 5 }}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search location..."
          style={{ padding: 5, width: 200 }}
        />
        <button type="submit" style={{ marginLeft: 5, padding: 5 }}>Search</button>
      </form>
      {results.length > 0 && (
        <ul style={{ listStyleType: "none", padding: 0, marginTop: 5 }}>
          {results.map((place, index) => (
            <li key={index} style={{ cursor: "pointer", padding: 5 }} onClick={() => moveToLocation(parseFloat(place.lon), parseFloat(place.lat))}>
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchLocation;
