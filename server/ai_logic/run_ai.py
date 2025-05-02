import sys
import json

# Load mock product data
with open('./data/mockProducts.json', 'r') as f:
    products = json.load(f)

# Get the product name from CLI arguments
query = sys.argv[1].lower()

# Filter matching products
matching_products = [p for p in products if query in p["name"].lower()]

# Return error if none found
if not matching_products:
    print(json.dumps({"error": "No products found"}))
    sys.exit(0)

# Define effective price calculation
def effective_price(p):
    return p["price"] - (p["price"] * (p["discount"] / 100)) - p["coupon"]

# Get best product
best_product = min(matching_products, key=effective_price)

# Return best product as JSON
print(json.dumps(best_product))
