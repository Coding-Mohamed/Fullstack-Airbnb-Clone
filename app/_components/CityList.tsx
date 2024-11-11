"use client";

import React from "react";
import Link from "next/link";
import { City } from "@/types/types";

interface CityListProps {
  onCitySelect: (cityName: string) => void;
}

// City image URLs
const cityImages: Record<string, string> = {
  Stockholm: "https://images.unsplash.com/photo-1508189860359-777d945909ef?w=800&auto=format&fit=crop&q=60",
  Oslo: "https://images.unsplash.com/photo-1608914876485-4e48b8d4b6c4?w=800&auto=format&fit=crop&q=60",
  Helsinki: "https://images.unsplash.com/photo-1611570266699-4b201348481b?w=800&auto=format&fit=crop&q=60",
  Copenhagen: "https://images.unsplash.com/photo-1499174549139-68d3f37243b4?w=800&auto=format&fit=crop&q=60",
  Reykjavik: "https://images.unsplash.com/photo-1565520599628-f1cff16e1c9e?w=800&auto=format&fit=crop&q=60",
};

// Predefined city list
const predefinedCities: City[] = [{ name: "Stockholm" }, { name: "Oslo" }, { name: "Helsinki" }, { name: "Copenhagen" }, { name: "Reykjavik" }];

const CityList: React.FC<CityListProps> = ({ onCitySelect }) => {
  return (
    <>
      <h1 className="text-3xl font-semibold text-center mt-12">Discover the Beauty of Nordic Cities</h1>
      <div className="flex flex-wrap justify-center gap-6 p-6 mt-5">
        {predefinedCities.map((city) => (
          <div key={city.name} onClick={() => onCitySelect(city.name)} className="flex flex-col items-center bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 w-60 cursor-pointer">
            <img src={cityImages[city.name]} alt={`${city.name} view`} className="w-full h-60 object-cover rounded-t-lg" />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-center">{city.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CityList;
