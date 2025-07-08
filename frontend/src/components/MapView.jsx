import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// ✅ Corrección definitiva: usar rutas públicas (copiadas manualmente)
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/marker-icon-2x.png',
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
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
      <Marker position={[site.lat, site.lng]}>
        <Popup>{site.name}</Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapView;



