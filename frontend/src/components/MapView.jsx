import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Crear ícono personalizado (rojo) como fallback
const customIcon = new L.Icon({
  iconUrl:
    'data:image/svg+xml;base64,' +
    btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41">
        <path fill="#d00" stroke="#fff" stroke-width="2"
              d="M12.5 0C5.6 0 0 5.5 0 12.3c0 7.6 10.5 19.3 11.2 20.1.7.7 1.9.7 2.6 0C14.5 31.6 25 19.9 25 12.3 25 5.5 19.4 0 12.5 0z"/>
        <circle fill="#fff" cx="12.5" cy="12.5" r="4.5"/>
      </svg>
    `),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function MapView({ site }) {
  if (!site) return null;

  return (
    <MapContainer
      center={[site.lat, site.lng]}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[site.lat, site.lng]} icon={customIcon}>
        <Popup>{site.name}</Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapView;






