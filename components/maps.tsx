"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; 


export default function ChurchMapLeaflet() {

 const loc = { lat: 8.99276, lng: 38.791764 };
  

  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-xl relative z-0 ">
      <MapContainer
        key={`${loc.lat}-${loc.lng}`} 
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
