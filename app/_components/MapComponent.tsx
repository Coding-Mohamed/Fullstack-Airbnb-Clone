// import React from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Fix for default icon issue with Leaflet
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// interface MapComponentProps {
//   lat: number;
//   lng: number;
//   title: string;
// }

// const MapComponent: React.FC<MapComponentProps> = ({ lat, lng, title }) => {
//   return (
//     <MapContainer center={[lat, lng]} zoom={13} style={{ width: "100%", height: "400px" }}>
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
//       <Marker position={[lat, lng]}>
//         <Popup>
//           <strong>{title}</strong>
//         </Popup>
//       </Marker>
//     </MapContainer>
//   );
// };

// export default MapComponent;
