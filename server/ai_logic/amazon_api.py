import requests
from config.settings import RAPIDAPI_KEY

def fetch_amazon_data(product_name: str):
    url = "https://real-time-amazon-data.p.rapidapi.com/search"
    querystring = {"query": product_name, "page": "1", "country": "IN"}

    headers = {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com"
    }

    try:
        response = requests.get(url, headers=headers, params=querystring)

        # Debugging output
        print("🔍 Status Code:", response.status_code)
        print("📄 Response Text:", response.text[:500])  # Preview only

        response.raise_for_status()  # Ensure no HTTP error occurred

        return response.json()
    except requests.exceptions.HTTPError as http_err:
        print(f"❌ HTTP error occurred: {http_err}")
        return {"error": "HTTPError", "message": str(http_err)}
    except requests.exceptions.RequestException as req_err:
        print(f"❌ Request error occurred: {req_err}")
        return {"error": "RequestException", "message": str(req_err)}
    except Exception as json_err:
        print(f"❌ JSON decode error: {json_err}")
        return {
            "error": "JSONDecodeError",
            "message": str(json_err),
            "raw": response.text
        }
