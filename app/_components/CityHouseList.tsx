"use client";

import { useState, useEffect } from "react";
import { db } from "../../firebaseConfig"; // Import Firebase config
import { collection, getDocs, query, where } from "firebase/firestore";
import { House } from "@/types/types";
import Link from "next/link";

interface CityHouseListProps {
  selectedCity: string;
}

const CityHouseList: React.FC<CityHouseListProps> = ({ selectedCity }) => {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedCity) return;

    const fetchHouses = async () => {
      try {
        const listingsCollection = collection(db, "listings");
        const q = query(listingsCollection, where("location", "==", selectedCity));
        const querySnapshot = await getDocs(q);
        const houseList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          uid: doc.id,
          ...doc.data(),
        })) as House[];
        setHouses(houseList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching houses: ", error);
        setError("Failed to fetch houses");
        setLoading(false);
      }
    };

    fetchHouses();
  }, [selectedCity]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-5 mt-5">
      <h2 className="text-2xl font-bold mb-4 text-center">Houses in {selectedCity || "Selected City"}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {houses.map((house) => (
          <Link key={house.uid} href={`/house/${house.uid}`}>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
              <div className="relative pb-2/3">
                <img src={house.images?.[0]} alt={house.title} className="w-full h-48 object-cover" />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold truncate">{house.title}</h2>
                  <p className="text-gray-500 text-sm">{house.location}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-lg font-bold">
                    ${house.price} <span className="text-sm">per night</span>
                  </p>
                  <div className="flex items-center">
                    <span className="text-red-500 mr-2">★</span>
                    <span>{(Math.random() * (5 - 4) + 4).toFixed(2)}</span> {/* Random star rating */}
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs">{house.number_of_bedrooms} Bedrooms</span>
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs">{house.number_of_bathrooms} Bathrooms</span>
                </div>
                <div className="mt-4 line-clamp-3">
                  <p className="text-sm">{house.description}</p>
                </div>
                <div className="mt-4">
                  <h3 className="text-md font-semibold">Amenities:</h3>
                  <ul className="list-none flex flex-wrap gap-1 mt-2">
                    {house.amenities.map((amenity, index) => (
                      <li key={index} className="bg-gray-200 px-2 py-1 text-xs rounded-full">
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CityHouseList;
