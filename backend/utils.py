def calculate_score(site):
    score = 100
    score -= site["feedstock_km"] * 2
    score -= site["grid_km"] * 1.5
    if site["zoning"] != "industrial":
        score -= 30
    return max(score, 0)