"use client";

import { useState } from "react";
import CityList from "./CityList";
import CityHouseList from "./CityHouseList";

const CitySelection: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");

  return (
    <div>
      <CityList onCitySelect={(cityName) => setSelectedCity(cityName)} />
      {selectedCity && <CityHouseList selectedCity={selectedCity} />}
    </div>
  );
};

export default CitySelection;
