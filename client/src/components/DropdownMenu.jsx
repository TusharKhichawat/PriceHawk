import React from "react";

export function DropdownMenu({selectedPlatform, onSelect}){
  const platforms=["All", "Amazon", "Flipkart", "AJIO"];

  return (
      <div className="mt-4 mb-2 text-center">
    <select
      value={selectedPlatform}
      onChange={(e) => onSelect(e.target.value)}
      className="border px-4 py-2 rounded shadow"
    >
      {platforms.map((platform) => (
        <option key={platform} value={platform}>
          {platform}
        </option>
      ))}
    </select>
  </div>
  )
}