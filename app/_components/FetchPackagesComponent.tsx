"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Link from "next/link";

// interface Package {
//   id: string;
//   title: string;
//   location: string;
//   price: number;
//   description: string;
//   duration: string;
//   highlights: string[];
//   images: string[];
//   category: string;
//   uid: string;
// }

const fetchPackages = async (): Promise<Package[]> => {
  const querySnapshot = await getDocs(collection(db, "packages"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    uid: doc.id,
    ...doc.data(),
  })) as Package[];
};

const normalizeCategory = (category: string): string => {
  return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
};

const FetchPackagesComponent: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPackages = async () => {
      try {
        const packagesData = await fetchPackages();
        const normalizedPackages = packagesData.map((pkg) => ({
          ...pkg,
          category: normalizeCategory(pkg.category),
        }));
        setPackages(normalizedPackages);
        // Extract unique categories
        const uniqueCategories = Array.from(new Set(normalizedPackages.map((pkg) => pkg.category)));
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching packages: ", e);
        setError("Failed to fetch packages");
        setLoading(false);
      }
    };

    loadPackages();
  }, []);

  const filteredPackages = selectedCategory ? packages.filter((pkg) => pkg.category === selectedCategory) : packages;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-10 mt-5">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 text-center">Explore Packages That Match Your Style</h2>

      {/* Categories Scrollable Filter */}
      <div className="flex space-x-4 overflow-x-auto pb-4 mb-6">
        <button onClick={() => setSelectedCategory(null)} className={`px-4 py-2 rounded-full ${!selectedCategory ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
          All
        </button>
        {categories.map((category, index) => (
          <button key={index} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-full ${selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
            {category}
          </button>
        ))}
      </div>

      {/* Package Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPackages.map((pkg) => (
          <Link key={pkg.uid} href={`/package/${pkg.uid}`} className="bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
            <div className="relative">
              <img src={pkg.images?.[0]} alt={pkg.title} className="w-full h-48 object-cover rounded-t-lg" />
              <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">{pkg.category}</span>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold truncate">{pkg.title}</h2>
                <p className="text-gray-500 text-sm">{pkg.location}</p>
              </div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm font-bold">
                  ${pkg.price} <span className="text-xs">per package</span>
                </p>
                <div className="flex items-center">
                  <span className="text-red-500 mr-1">★</span>
                  <span>{(Math.random() * (5 - 4) + 4).toFixed(2)}</span>
                </div>
              </div>
              <p className="text-sm line-clamp-3 mb-4">{pkg.description}</p>
              <h3 className="text-md font-semibold mb-2">Highlights:</h3>
              <ul className="list-none flex flex-wrap gap-1">
                {pkg.highlights.map((highlight, index) => (
                  <li key={index} className="text-xs bg-gray-100 px-2 py-1 rounded flex items-center">
                    <span className="text-green-500 mr-1">✔</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FetchPackagesComponent;
