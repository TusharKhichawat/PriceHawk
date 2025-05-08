from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from ai_logic.bestDealModel import predict_best_deal
from ai_logic.amazon_api import fetch_amazon_data

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/realtime/amazon")
async def get_amazon_data(product_name: str):
    data = fetch_amazon_data(product_name)
    return data

@app.get("/best-deal")
async def best_deal(name: str):
    # Fetch real-time data from Amazon API
    data = fetch_amazon_data(name)

    if "error" in data:
        raise HTTPException(status_code=500, detail=data["error"])

    products = data.get("data", {}).get("products", [])
    if not products:
        raise HTTPException(status_code=404, detail="No products found")

    # 🧠 Perform case-insensitive partial match
    matching_products = [
        product for product in products
        if name.lower() in product.get("product_title", "").lower()
    ]

    if not matching_products:
        raise HTTPException(status_code=404, detail="No matching products found")

    best_deal = predict_best_deal(name, matching_products)

    if not best_deal:
        raise HTTPException(status_code=404, detail="No suitable deal predicted")

    return {"best_deal": best_deal}
