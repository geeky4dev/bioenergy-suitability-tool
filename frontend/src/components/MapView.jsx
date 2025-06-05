import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapView({ site }) {
  if (!site) return null;

  return (
    <MapContainer center={[site.lat, site.lng]} zoom={13} style={{ height: '400px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[site.lat, site.lng]}>
        <Popup>{site.name}</Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapView;
