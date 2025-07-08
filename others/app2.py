from flask import Flask, jsonify, request
import sqlite3

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('db.sqlite3')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/sites', methods=['GET'])
def get_sites():
    zoning = request.args.get('zoning', '')
    min_area = request.args.get('min_area', type=float)
    max_feedstock = request.args.get('max_feedstock', type=float)
    max_grid = request.args.get('max_grid', type=float)

    conn = get_db_connection()
    cursor = conn.cursor()

    query = "SELECT *, (100 - (area * 2 + feedstock_km * 5 + grid_km * 5)) AS suitability_score FROM sites WHERE 1=1"
    params = []

    if zoning:
        query += " AND zoning = ?"
        params.append(zoning)
    if min_area is not None:
        query += " AND area >= ?"
        params.append(min_area)
    if max_feedstock is not None:
        query += " AND feedstock_km <= ?"
        params.append(max_feedstock)
    if max_grid is not None:
        query += " AND grid_km <= ?"
        params.append(max_grid)

    cursor.execute(query, params)
    sites = cursor.fetchall()
    conn.close()

    result = [dict(site) for site in sites]
    return jsonify(result)


@app.route('/api/sites', methods=['POST'])
def add_site():
    data = request.json
    name = data.get('name')
    lat = data.get('lat')
    lng = data.get('lng')
    area = data.get('area', 0)
    feedstock_km = data.get('feedstock_km', 0)
    grid_km = data.get('grid_km', 0)
    zoning = data.get('zoning', '')

    if not name or lat is None or lng is None or not zoning:
        return jsonify({'error': 'Missing required fields'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO sites (name, lat, lng, area, feedstock_km, grid_km, zoning)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (name, lat, lng, area, feedstock_km, grid_km, zoning))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Site added successfully'}), 201


if __name__ == '__main__':
    app.run(debug=True)