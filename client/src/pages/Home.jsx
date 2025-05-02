import { useState } from "react";
import { HeroSection } from "../components/HeroSection";
import { SearchBar } from "../components/SearchBar";
import { ProductList } from "../components/ProductList";
import { DropdownMenu } from "../components/DropdownMenu";
import { PopularSuggestions } from "../components/PopularSuggestions";
import { mockProducts } from "../data/mockProduct";

export function Home() {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState("All");

  const handleSearch = (text) => setQuery(text);

  const filteredProducts = mockProducts.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(query.toLowerCase());
    const matchesPlatform = platform === "All" || p.platform === platform;
    return matchesSearch && matchesPlatform;
  });

  return (
    <div>
      <HeroSection />
      <DropdownMenu selectedPlatform={platform} onSelect={setPlatform} />
      <SearchBar onSearch={handleSearch} />
      <PopularSuggestions onSearch={handleSearch} />
      <ProductList products={filteredProducts} />
    </div>
  );
}
