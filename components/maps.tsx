// "use client";

// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css"; 


// export default function ChurchMapLeaflet() {

//  const loc = { lat: 8.99276, lng: 38.791764 };
  

//   return (
//     <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-xl relative z-0 ">
//       <MapContainer
//         key={`${loc.lat}-${loc.lng}`} 
//         bounds={[[loc.lat - 0.01, loc.lng - 0.01], [loc.lat + 0.01, loc.lng + 0.01]]}
//         boundsOptions={{ padding: [50, 50] }}
//         style={{ height: "100%", width: "100%" }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               />
 
//           <Marker position={[loc.lat, loc.lng]}>
//             <Popup>📍 Church Location</Popup>
//           </Marker>
      
//       </MapContainer>
//     </div>
//   );
// }



"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface ChurchMapLeafletProps {
  lat: number;
  lng: number;
  address: string;
}

export default function ChurchMapLeaflet({ lat, lng, address }: ChurchMapLeafletProps) {
  return (
    <div className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-xl transition-shadow hover:shadow-2xl">
      <MapContainer
        key={`${lat}-${lng}`}
       bounds={[[lat - 0.01, lng - 0.01], [lat + 0.01, lng + 0.01]]}
       boundsOptions={{ padding: [50, 50] }}
         // Street-level zoom for a premium, detailed view
        style={{ height: "100%", width: "100%" }}
        aria-label={`Map showing church location at ${address}`}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
        <Marker position={[lat, lng]}>
          <Popup>
            📍 Church Location<br />
            {address}<br />
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Get Directions
            </a>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}