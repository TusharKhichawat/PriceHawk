export function PopularSuggestions({ onSearch }) {
    const suggestions = ["Nike Shoes", "Wireless Earbuds", "Smart Watches", "T-Shirts"];
  
    return (
      <div className="flex flex-wrap justify-center gap-3 mt-4 mb-6">
        {suggestions.map((text) => (
          <button
            key={text}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => onSearch(text)}
          >
            {text}
          </button>
        ))}
      </div>
    );
  }
  