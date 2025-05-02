import json
import os
import numpy as np
from sklearn.linear_model import LinearRegression

# Load mock products
def load_data():
    with open(os.path.join(os.path.dirname(__file__), '../data/mockProducts.json')) as f:
        data = json.load(f)
    return data

# Prepare training data
def prepare_training_data(data):
    X = []
    y = []

    for product in data:
        price = product.get("price", 0)
        discount = product.get("discount", 0)
        coupon = product.get("coupon", 0)
        trust = product.get("trustworthiness", 0)
        
        final_price = price * (1 - discount/100) - coupon
        X.append([price, discount, coupon, trust])
        y.append(final_price)

    return np.array(X), np.array(y)

# Train model
def train_model():
    data = load_data()
    X, y = prepare_training_data(data)

    model = LinearRegression()
    model.fit(X, y)

    return model, data

# Predict best deal with AI model
def predict_best_deal(product_name):
    model, data = train_model()

    # Filter matching products
    matches = [p for p in data if product_name.lower() in p["name"].lower()]
    if not matches:
        return None

    X_test = np.array([
        [p.get("price", 0), p.get("discount", 0), p.get("coupon", 0), p.get("trustworthiness", 0)]
        for p in matches
    ])

    predictions = model.predict(X_test)

    # Select best (lowest predicted price)
    best_index = np.argmin(predictions)
    best_product = matches[best_index]

    # Reapply the final price calculation based on AI model's output
    price = best_product.get("price", 0)
    discount = best_product.get("discount", 0)
    coupon = best_product.get("coupon", 0)

    predicted_final_price = price * (1 - discount / 100) - coupon  # Reapply the calculation
    best_product["predictedFinalPrice"] = round(predicted_final_price, 2)  # Assign final predicted price

    return best_product
