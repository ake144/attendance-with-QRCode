"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // ✅ make sure you import Leaflet styles

type Coords = { lat: number; lng: number };

export default function ChurchMapLeaflet() {
  const [loc, setLoc] = useState<Coords | null>(null);
  const API_KEY = process.env.NEXT_PUBLIC_GEBETA_API!;

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MAP_API_KEY}?name=yougo&apiKey=${API_KEY}`
      );
      const data = await res.json();
      const first = data?.data?.[0];
      if (first) setLoc({ lat: first.latitude, lng: first.longitude });
    })();
  }, [API_KEY]);

  if (!loc)
    return (
      <div className="h-[500px] flex items-center justify-center">
        Loading map…
      </div>
    );

  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-xl">
      <MapContainer
        bounds={[[loc.lat - 0.01, loc.lng - 0.01], [loc.lat + 0.01, loc.lng + 0.01]]} 
        boundsOptions={{ padding: [50, 50] }} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
        <Marker position={[loc.lat, loc.lng]}>
          <Popup>📍 Church Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
