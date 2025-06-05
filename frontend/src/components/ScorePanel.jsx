function ScorePanel({ site, score }) {
  if (!site) return <div>Loading...</div>;

  return (
    <div className="card p-3 mt-3">
      <h4>{site.name}</h4>
      <p>Area: {site.area} ha</p>
      <p>Feedstock: {site.feedstock_km} km</p>
      <p>Grid: {site.grid_km} km</p>
      <p>Zoning: {site.zoning}</p>
      <h5>Suitability Score: {score}</h5>
    </div>
  );
}

export default ScorePanel;

