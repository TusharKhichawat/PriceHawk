import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch, FaSpinner, FaExclamationTriangle, FaTag, FaStore, FaClock, FaExternalLinkAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bestDeal, setBestDeal] = useState(null);
  const [topDeals, setTopDeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);
    setBestDeal(null);
    setTopDeals([]);

    try {
      // Get the best deal
      const bestDealResponse = await axios.get(`http://localhost:8000/best-deal?name=${encodeURIComponent(searchTerm)}`);
      setBestDeal(bestDealResponse.data.best_deal);

      // Get top 5 deals
      const topDealsResponse = await axios.get(`http://localhost:8000/realtime/amazon?product_name=${encodeURIComponent(searchTerm)}`);
      const products = topDealsResponse.data.data?.products || [];
      
      // Sort by price and get top 5
      const sortedProducts = products
        .sort((a, b) => {
          const priceA = parseFloat(a.product_price?.replace(/[^0-9.]/g, '') || '0');
          const priceB = parseFloat(b.product_price?.replace(/[^0-9.]/g, '') || '0');
          return priceA - priceB;
        })
        .slice(0, 5);

      setTopDeals(sortedProducts);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch product information');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for products..."
            className="flex-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors duration-200"
          >
            <FaSearch />
            Search
          </button>
        </div>
      </form>

      {loading && (
        <div className="text-center py-12">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto" />
          <p className="mt-4 text-gray-600 text-lg">Searching for the best deals...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg relative mb-6">
          <FaExclamationTriangle className="inline mr-2" />
          {error}
        </div>
      )}

      {bestDeal && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Best Deal Found</h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <img
                  src={bestDeal.product_photo}
                  alt={bestDeal.product_title}
                  className="w-full md:w-48 h-48 object-cover rounded-lg shadow-md"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{bestDeal.product_title}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600 mb-1">Price</p>
                      <p className="text-2xl font-bold text-green-600">₹{bestDeal.product_price}</p>
                      {bestDeal.product_original_price && (
                        <p className="text-sm text-gray-500 line-through">₹{bestDeal.product_original_price}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Store</p>
                      <p className="font-semibold text-gray-800">Amazon</p>
                      <p className="text-sm text-gray-500">Trust Score: 90%</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4">
                    {bestDeal.product_discount && (
                      <div className="flex items-center gap-2 text-blue-600">
                        <FaTag />
                        <span>Discount: {bestDeal.product_discount}%</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaClock />
                      <span>Updated: {new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                  <a
                    href={bestDeal.product_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                  >
                    <FaExternalLinkAlt />
                    View on Amazon
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {topDeals.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Top 5 Deals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topDeals.map((deal, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  src={deal.product_photo}
                  alt={deal.product_title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2 text-gray-800 line-clamp-2">{deal.product_title}</h3>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="text-green-600 font-bold">₹{deal.product_price}</p>
                      {deal.product_original_price && (
                        <p className="text-sm text-gray-500 line-through">₹{deal.product_original_price}</p>
                      )}
                    </div>
                    {deal.product_discount && (
                      <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                        {deal.product_discount}% OFF
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                    <span>Amazon</span>
                    <span>Trust: 90%</span>
                  </div>
                  <a
                    href={deal.product_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
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
    product_title: PropTypes.string.isRequired,
    product_price: PropTypes.string.isRequired,
    product_original_price: PropTypes.string,
    product_photo: PropTypes.string.isRequired,
    product_url: PropTypes.string.isRequired,
    product_discount: PropTypes.string,
  })
};

export default ProductSearch; 