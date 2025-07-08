import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const API_BASE = import.meta.env.VITE_API_URL || '';

function App() {
  const [sites, setSites] = useState([]);
  const [filters, setFilters] = useState({
    zoning: '',
    min_area: '',
    max_feedstock: '',
    max_grid: ''
  });
  const [newSite, setNewSite] = useState({
    name: '',
    lat: '',
    lng: '',
    area: '',
    feedstock_km: '',
    grid_km: '',
    zoning: ''
  });

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    try {
      const res = await fetch(`${API_BASE}/api/sites?${query}`);
      if (!res.ok) throw new Error('Error fetching sites');
      const data = await res.json();
      setSites(data);
    } catch (error) {
      console.error('Error fetching sites:', error);
      setSites([]);
    }
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilter = (e) => {
    e.preventDefault();
    fetchSites(filters);
  };

  const handleNewSiteChange = (e) => {
    setNewSite({ ...newSite, [e.target.name]: e.target.value });
  };

  const handleAddSite = async (e) => {
    e.preventDefault();

    const parsedSite = {
      ...newSite,
      lat: parseFloat(newSite.lat),
      lng: parseFloat(newSite.lng),
      area: parseFloat(newSite.area),
      feedstock_km: parseFloat(newSite.feedstock_km),
      grid_km: parseFloat(newSite.grid_km),
    };

    try {
      const res = await fetch(`${API_BASE}/api/sites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedSite),
      });

      if (!res.ok) throw new Error('Failed to add site');

      setNewSite({
        name: '',
        lat: '',
        lng: '',
        area: '',
        feedstock_km: '',
        grid_km: '',
        zoning: ''
      });

      fetchSites(filters);
    } catch (error) {
      alert('Error adding site: ' + error.message);
    }
  };

  const generatePDF = () => {
    const content = sites.map(site => (
      `Name: ${site.name}
Latitude: ${site.lat}
Longitude: ${site.lng}
Area: ${site.area} ha
Feedstock distance: ${site.feedstock_km} km
Grid distance: ${site.grid_km} km
Zoning: ${site.zoning}
Suitability Score: ${site.suitability_score}
---------------------------`
    )).join('\n\n');

    const newWindow = window.open('', '', 'width=600,height=400');
    newWindow.document.write('<pre>' + content + '</pre>');
    newWindow.document.title = 'Bioenergy Sites Report';
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>🌱 Bioenergy Site Suitability Tool</h1>

      <form onSubmit={handleFilter} style={{ marginBottom: '1rem' }}>
        <label>
          Zoning:{' '}
          <select name="zoning" value={filters.zoning} onChange={handleChange}>
            <option value="">All</option>
            <option value="industrial">Industrial</option>
            <option value="residential">Residential</option>
            <option value="rural">Rural</option>
          </select>
        </label>{' '}
        <label>
          Min Area (ha):{' '}
          <input type="number" name="min_area" value={filters.min_area} onChange={handleChange} />
        </label>{' '}
        <label>
          Max Feedstock (km):{' '}
          <input type="number" name="max_feedstock" value={filters.max_feedstock} onChange={handleChange} />
        </label>{' '}
        <label>
          Max Grid (km):{' '}
          <input type="number" name="max_grid" value={filters.max_grid} onChange={handleChange} />
        </label>{' '}
        <button type="submit">Apply Filters</button>
      </form>

      <p style={{ marginBottom: '1rem' }}>
        🌍 Use the filters to view bioenergy sites based on zoning, area, and proximity to feedstock and grid.
      </p>

      <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {sites.map(site => (
          <Marker key={site.id} position={[site.lat, site.lng]}>
            <Popup>
              <strong>{site.name}</strong><br />
              📐 Area: {site.area} ha<br />
              🌿 Feedstock: {site.feedstock_km} km<br />
              ⚡ Grid: {site.grid_km} km<br />
              🏷️ Zoning: {site.zoning}<br />
              📊 Suitability Score: {site.suitability_score}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <form onSubmit={handleAddSite} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
        <h2>Add New Site</h2>

        <label>Name:<br />
          <input type="text" name="name" value={newSite.name} onChange={handleNewSiteChange} required />
        </label><br />

        <label>Latitude:<br />
          <input type="number" step="any" name="lat" value={newSite.lat} onChange={handleNewSiteChange} required />
        </label><br />

        <label>Longitude:<br />
          <input type="number" step="any" name="lng" value={newSite.lng} onChange={handleNewSiteChange} required />
        </label><br />

        <label>Area (ha):<br />
          <input type="number" step="any" name="area" value={newSite.area} onChange={handleNewSiteChange} required />
        </label><br />

        <label>Feedstock distance (km):<br />
          <input type="number" step="any" name="feedstock_km" value={newSite.feedstock_km} onChange={handleNewSiteChange} required />
        </label><br />

        <label>Grid distance (km):<br />
          <input type="number" step="any" name="grid_km" value={newSite.grid_km} onChange={handleNewSiteChange} required />
        </label><br />

        <label>Zoning:<br />
          <select name="zoning" value={newSite.zoning} onChange={handleNewSiteChange} required>
            <option value="">Select zoning</option>
            <option value="industrial">Industrial</option>
            <option value="residential">Residential</option>
            <option value="rural">Rural</option>
          </select>
        </label><br /><br />

        <button type="submit">Add Site</button>
      </form>

      <button onClick={generatePDF} style={{ marginBottom: '1rem' }}>
        Generate PDF Report
      </button>
    </div>
  );
}

export default App;

































