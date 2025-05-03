import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch, FaSpinner, FaExclamationTriangle, FaTag, FaStore, FaClock, FaExternalLinkAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [bestDeal, setBestDeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);
    setBestDeal(null);
    setProducts([]);

    try {
      // First get the best deal
      const bestDealResponse = await axios.get(`http://localhost:8000/best-deal?name=${encodeURIComponent(searchTerm)}`);
      setBestDeal(bestDealResponse.data.best_deal);

      // Then get top 5 products
      const productsResponse = await axios.get(`http://localhost:8000/products?name=${encodeURIComponent(searchTerm)}`);
      setProducts(productsResponse.data.products);
    } catch (err) {
      setError('Failed to fetch product information');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for products..."
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
          >
            <FaSearch />
            Search
          </button>
        </div>
      </form>

      {loading && (
        <div className="text-center py-8">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto" />
          <p className="mt-2 text-gray-600">Searching for the best deals...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <FaExclamationTriangle className="inline mr-2" />
          {error}
        </div>
      )}

      {bestDeal && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Best Deal</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-6">
                <img
                  src={bestDeal.imageUrl}
                  alt={bestDeal.name}
                  className="w-32 h-32 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{bestDeal.name}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">Price</p>
                      <p className="text-2xl font-bold text-green-600">₹{bestDeal.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-500 line-through">₹{bestDeal.originalPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Store</p>
                      <p className="font-semibold">{bestDeal.store}</p>
                      <p className="text-sm text-gray-500">Trust Score: {bestDeal.trustworthiness * 100}%</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-4">
                    <div className="flex items-center gap-2 text-blue-600">
                      <FaTag />
                      <span>Discount: {bestDeal.discount}%</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-600">
                      <FaStore />
                      <span>Coupon: ₹{bestDeal.couponCode}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaClock />
                      <span>Updated: {new Date(bestDeal.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <a
                    href={bestDeal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    <FaExternalLinkAlt />
                    View Deal
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {products.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Top 5 Deals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="text-green-600 font-bold">₹{product.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-500 line-through">₹{product.originalPrice.toFixed(2)}</p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                      {product.discount}% OFF
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>{product.platform}</span>
                    <span>Trust: {product.trustworthiness * 100}%</span>
                  </div>
                  <a
                    href={product.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 block text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    View Deal
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// PropTypes validation
ProductSearch.propTypes = {
  bestDeal: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    store: PropTypes.string.isRequired,
    lastUpdated: PropTypes.string.isRequired,
    couponCode: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    discount: PropTypes.number.isRequired,
    trustworthiness: PropTypes.number.isRequired
  })
};

export default ProductSearch; 