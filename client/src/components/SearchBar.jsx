export function SearchBar({ onSearch }) {
    return (
      <div className="p-4">
        <input
          onChange={(e) => onSearch(e.target.value)}
          className="w-full p-2 border rounded shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          type="text"
          placeholder="Search for products..."
        />
      </div>
    );
  }
  