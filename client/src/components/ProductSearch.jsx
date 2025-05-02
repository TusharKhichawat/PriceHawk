import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export const ProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [bestDeal, setBestDeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch products for dropdown
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  // Fetch best deal when product is selected
  const handleProductSelect = async (productName) => {
    setSelectedProduct(productName);
    if (!productName) {
      setBestDeal(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:3000/products/best-deal?name=${encodeURIComponent(productName)}`);
      setBestDeal(response.data);
    } catch (err) {
      setError('Failed to fetch best deal');
      console.error('Error fetching best deal:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <label htmlFor="product-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select a Product
        </label>
        <select
          id="product-select"
          value={selectedProduct}
          onChange={(e) => handleProductSelect(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select a product...</option>
          {products.map((product) => (
            <option key={product.id} value={product.name}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
          {error}
        </div>
      )}

      {bestDeal && !loading && (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/3">
              <img
                src={bestDeal.imageUrl || 'https://via.placeholder.com/300x300?text=No+Image'}
                alt={bestDeal.name}
                className="w-full h-64 object-cover"
              />
            </div>
            
            {/* Product Details */}
            <div className="p-6 md:w-2/3">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{bestDeal.name}</h2>
              
              <div className="space-y-4">
                {/* Price and Discount */}
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-indigo-600">
                    ${bestDeal.price.toFixed(2)}
                  </span>
                  {bestDeal.originalPrice && (
                    <>
                      <span className="text-lg text-gray-500 line-through">
                        ${bestDeal.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-sm font-medium text-green-600">
                        {Math.round((1 - bestDeal.price / bestDeal.originalPrice) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>

                {/* Store and Last Updated */}
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="font-medium">Store: {bestDeal.store}</span>
                  <span>•</span>
                  <span>Updated: {new Date(bestDeal.lastUpdated).toLocaleDateString()}</span>
                </div>

                {/* Coupon Code */}
                {bestDeal.couponCode && (
                  <div className="bg-gray-50 p-3 rounded-md">
                    <span className="font-medium text-gray-700">Coupon Code: </span>
                    <span className="font-mono bg-white px-2 py-1 rounded border border-gray-200">
                      {bestDeal.couponCode}
                    </span>
                  </div>
                )}

                {/* Buy Now Button */}
                {bestDeal.url && (
                  <a
                    href={bestDeal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full md:w-auto px-6 py-3 bg-indigo-600 text-white text-center font-semibold rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    Buy Now
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ProductSearch.propTypes = {
  bestDeal: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    imageUrl: PropTypes.string,
    store: PropTypes.string.isRequired,
    lastUpdated: PropTypes.string.isRequired,
    couponCode: PropTypes.string,
    url: PropTypes.string
  })
}; 