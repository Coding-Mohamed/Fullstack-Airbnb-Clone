"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { FaCalendarAlt } from "react-icons/fa";

interface SearchResult {
  id: string;
  type: "house" | "package";
  location: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  uid: string;
}

const SearchResults: React.FC = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const [startDate, setStartDate] = useState<string | null>(searchParams.get("startDate"));
  const [endDate, setEndDate] = useState<string | null>(searchParams.get("endDate"));

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!location) {
        setError("Location is required");
        setLoading(false);
        return;
      }

      try {
        const listingsQuery = query(collection(db, "listings"), where("location", "==", location));
        const packagesQuery = query(collection(db, "packages"), where("location", "==", location));

        const [listingsSnapshot, packagesSnapshot] = await Promise.all([getDocs(listingsQuery), getDocs(packagesQuery)]);

        const searchResults: SearchResult[] = [
          ...listingsSnapshot.docs.map((doc) => ({
            id: doc.id,
            uid: doc.id,
            type: "house" as const,
            ...(doc.data() as Omit<SearchResult, "id" | "type">),
          })),
          ...packagesSnapshot.docs.map((doc) => ({
            id: doc.id,
            uid: doc.id,
            type: "package" as const,
            ...(doc.data() as Omit<SearchResult, "id" | "type">),
          })),
        ];

        setResults(searchResults);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setError("Failed to fetch search results");
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [location]);

  const getNextAvailableDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Next available date
    return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl font-semibold mb-4">No Results Found</h2>
        <p className="text-gray-600">No properties or packages found in {location} for your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Search Results for {location}</h1>
      <div className={`mb-6 p-4 rounded-lg shadow-md border flex flex-col md:flex-row md:items-center md:gap-4 ${startDate && endDate ? "bg-gradient-to-r from-red-400 to-red-600 border-red-500 text-white" : "bg-gray-50 border-gray-300 text-gray-700"}`}>
        {startDate && endDate ? (
          <>
            <FaCalendarAlt className="text-white" />
            <span className="font-medium">
              Available from <span className="underline">{new Date(startDate).toLocaleDateString()}</span> to <span className="underline">{new Date(endDate).toLocaleDateString()}</span>
            </span>
            <div className="flex flex-col md:flex-row w-full gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  const newStartDate = e.target.value;
                  setStartDate(newStartDate);
                  if (newStartDate && new Date(newStartDate) >= new Date(endDate || "")) {
                    setEndDate(new Date(newStartDate).toISOString().split("T")[0]);
                  }
                }}
                min={getNextAvailableDate()}
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-red-500 transition w-full md:w-1/2"
              />
              <input type="date" value={endDate || ""} onChange={(e) => setEndDate(e.target.value)} min={startDate ? new Date(startDate).toISOString().split("T")[0] : getNextAvailableDate()} className="border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:ring-red-500 transition w-full md:w-1/2" />
            </div>
          </>
        ) : (
          <>
            <FaCalendarAlt className="text-gray-500" />
            <span className="font-medium">Please select a date range</span>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((result) => (
          <Link key={result.id} href={`/${result.type === "house" ? "house" : "package"}/${result.uid}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105">
              {result.images && result.images[0] && <img src={result.images[0]} alt={result.title} className="w-full h-48 object-cover" />}
              <div className="p-3">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold">{result.title}</h2>
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">{result.type.charAt(0).toUpperCase() + result.type.slice(1)}</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{result.location}</p>
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{result.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">${result.price} / night</span>
                  <div className="flex items-center">
                    <span className="text-red-500 mr-1">★</span>
                    <span>{(Math.random() * (5 - 4) + 4).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
