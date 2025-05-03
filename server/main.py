from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load mock data
def load_mock_data():
    try:
        with open("data/mockProducts.json", "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return []

# Product models
class Product(BaseModel):
    id: str
    name: str
    price: float
    discount: float
    coupon: float
    platform: str
    trustworthiness: float
    affiliateLink: str
    category: str
    image: str

class BestDeal(BaseModel):
    name: str
    price: float
    originalPrice: float
    imageUrl: str
    store: str
    lastUpdated: str
    couponCode: float
    url: str

@app.get("/products")
async def search_products(name: str) -> dict:
    products = load_mock_data()
    if not products:
        raise HTTPException(status_code=404, detail="No products found")
    
    # Filter products by name (case-insensitive)
    filtered_products = [
        product for product in products 
        if name.lower() in product["name"].lower()
    ]
    
    # Calculate final prices with discounts
    for product in filtered_products:
        product["final_price"] = product["price"] * (1 - product["discount"] / 100)
    
    # Sort by final price and get top 5
    best_deals = sorted(filtered_products, key=lambda x: x["final_price"])[:5]
    
    # Format the response
    formatted_deals = []
    for deal in best_deals:
        formatted_deals.append({
            "id": deal["id"],
            "name": deal["name"],
            "price": deal["final_price"],
            "originalPrice": deal["price"],
            "discount": deal["discount"],
            "coupon": deal["coupon"],
            "platform": deal["platform"],
            "trustworthiness": deal["trustworthiness"],
            "affiliateLink": deal["affiliateLink"],
            "category": deal["category"],
            "image": deal["image"]
        })
    
    return {"products": formatted_deals}

@app.get("/best-deal")
async def get_best_deal(name: str) -> dict:
    products = load_mock_data()
    if not products:
        raise HTTPException(status_code=404, detail="No products found")
    
    # Find all products with matching name (case-insensitive partial match)
    matching_products = [
        product for product in products 
        if name.lower() in product["name"].lower()
    ]
    
    if not matching_products:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Calculate final prices with discounts
    for product in matching_products:
        product["final_price"] = product["price"] * (1 - product["discount"] / 100)
    
    # Find the product with lowest final price
    best_deal = min(matching_products, key=lambda x: x["final_price"])
    
    # Convert to BestDeal format
    best_deal_response = {
        "name": best_deal["name"],
        "price": best_deal["final_price"],
        "originalPrice": best_deal["price"],
        "imageUrl": best_deal["image"],
        "store": best_deal["platform"],
        "lastUpdated": datetime.now().isoformat(),
        "couponCode": best_deal["coupon"],
        "url": best_deal["affiliateLink"],
        "discount": best_deal["discount"],
        "trustworthiness": best_deal["trustworthiness"]
    }
    
    return {"best_deal": best_deal_response}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
