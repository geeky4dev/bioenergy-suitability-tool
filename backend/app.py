from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

def get_db_connection():
    conn = sqlite3.connect('db.sqlite3')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/sites')
def get_sites():
    zoning = request.args.get('zoning', '')
    min_area = request.args.get('min_area', type=float)
    max_feedstock = request.args.get('max_feedstock', type=float)
    max_grid = request.args.get('max_grid', type=float)

    query = "SELECT *, (100 - feedstock_km*5 - grid_km*3 + area) as suitability_score FROM sites WHERE 1=1"
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

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()

    sites = [dict(row) for row in rows]
    return jsonify(sites)

if __name__ == '__main__':
    app.run(debug=True)
























