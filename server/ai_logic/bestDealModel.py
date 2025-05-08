import numpy as np
from sklearn.linear_model import LinearRegression
import re

def clean_price(price_str):
    if not price_str:
        return None
    try:
        return float(re.sub(r"[^\d.]", "", price_str))
    except:
        return None

def prepare_training_data(data):
    X = []
    y = []

    for product in data:
        price = clean_price(product.get("product_price"))
        original = clean_price(product.get("product_original_price"))
        rating = float(product.get("product_star_rating") or 3)  # default rating 3
        coupon = 0.0  # Amazon API doesn't provide, assume 0

        if price is None or original is None:
            continue

        discount = max(0.0, (original - price) / original * 100)

        final_price = price  # Already includes discount

        X.append([original, discount, coupon, rating])
        y.append(final_price)

    return np.array(X), np.array(y)

def predict_best_deal(product_name, products):
    filtered = [p for p in products if product_name.lower() in p.get("product_title", "").lower()]
    if not filtered:
        return None

    X, y = prepare_training_data(filtered)
    if len(X) == 0:
        return None

    model = LinearRegression()
    model.fit(X, y)
    predictions = model.predict(X)

    best_index = np.argmin(predictions)
    best_product = filtered[best_index]

    best_product["predictedFinalPrice"] = round(predictions[best_index], 2)
    return best_product
