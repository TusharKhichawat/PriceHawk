from fastapi import FastAPI, HTTPException
from ai_logic.bestDealModel import predict_best_deal
import json

app = FastAPI()

# Read mock product data
with open('data/mockProducts.json') as f:
    products = json.load(f)

@app.get("/products")
async def search_products(name: str):
    # Simple search function (filter by name)
    results = [p for p in products if name.lower() in p['name'].lower()]
    return {"products": results}

@app.get("/best-deal")
async def best_deal(name: str):
    # Get the best deal using AI logic
    best_deal = predict_best_deal(name)
    
    if not best_deal:
        raise HTTPException(status_code=404, detail="No matching products found")
    
    return {"best_deal": best_deal}
