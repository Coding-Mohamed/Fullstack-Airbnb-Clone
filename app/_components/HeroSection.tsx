"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaUserFriends } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { City, DateRange } from "../../types/types";
import images from "./Images";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";

interface HeroSectionProps {
  citiesEndpoint: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ citiesEndpoint }) => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [location, setLocation] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange>({ startDate: undefined, endDate: undefined });
  const [guests, setGuests] = useState<number>(2);
  const [cities, setCities] = useState<City[]>([]);
  const [showCities, setShowCities] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const [listingsSnapshot, packagesSnapshot] = await Promise.all([getDocs(collection(db, "listings")), getDocs(collection(db, "packages"))]);

        const citiesSet = new Set<string>();

        listingsSnapshot.docs.forEach((doc) => {
          citiesSet.add(doc.data().location);
        });

        packagesSnapshot.docs.forEach((doc) => {
          citiesSet.add(doc.data().location);
        });

        setCities(Array.from(citiesSet).map((city) => ({ name: city })));
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCities(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCitySelect = (cityName: string) => {
    setLocation(cityName);
    setShowCities(false);
    setErrorMessage(""); // Clear error message when a city is selected
  };

  const handleSearch = async () => {
    if (!location) {
      setErrorMessage("Please select a location before searching.");
      return;
    }

    try {
      const listingsQuery = query(collection(db, "listings"), where("location", "==", location));
      const packagesQuery = query(collection(db, "packages"), where("location", "==", location));

      const [listingsSnapshot, packagesSnapshot] = await Promise.all([getDocs(listingsQuery), getDocs(packagesQuery)]);

      const results = [
        ...listingsSnapshot.docs.map((doc) => ({
          id: doc.id,
          type: "listing",
          ...doc.data(),
        })),
        ...packagesSnapshot.docs.map((doc) => ({
          id: doc.id,
          type: "package",
          ...doc.data(),
        })),
      ];

      const searchParams = new URLSearchParams({
        location,
        startDate: dateRange.startDate?.toISOString() || "",
        endDate: dateRange.endDate?.toISOString() || "",
        guests: guests.toString(),
      });

      router.push(`/search?${searchParams.toString()}`);
    } catch (error) {
      console.error("Error performing search:", error);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="relative w-full h-[95vh] bg-cover bg-center" style={{ backgroundImage: `url(${images[currentImageIndex]})` }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Find Your Perfect Stay</h1>
        <p className="text-base md:text-lg mb-8">Discover amazing places in the world</p>

        <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 w-full max-w-4xl">
          <div className="relative flex items-center bg-gray-100 p-2 rounded-lg w-full md:w-1/4 border border-gray-300" ref={dropdownRef}>
            <FaMapMarkerAlt className="absolute left-3 text-gray-500" />
            <input type="text" placeholder="Select a location" required value={location} onFocus={() => setShowCities(true)} readOnly className="bg-transparent flex-1 pl-10 text-black focus:outline-none cursor-pointer" />
            {showCities && (
              <ul className="absolute z-20 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg max-h-60 overflow-auto left-0 top-full">
                {cities.map((city) => (
                  <li key={city.name} onClick={() => handleCitySelect(city.name)} className="p-2 hover:bg-gray-100 cursor-pointer text-black">
                    {city.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="relative flex items-center bg-gray-100 p-2 rounded-lg w-full md:w-1/5 border border-gray-300">
            <FaCalendarAlt className="absolute left-3 text-gray-500" />
            <DatePicker selected={dateRange.startDate} onChange={(date) => setDateRange((prev) => ({ ...prev, startDate: date }))} selectsStart startDate={dateRange.startDate} endDate={dateRange.endDate} placeholderText="Check-in" className="bg-transparent flex-1 pl-10 text-black focus:outline-none" />
          </div>

          <div className="relative flex items-center bg-gray-100 p-2 rounded-lg w-full md:w-1/5 border border-gray-300">
            <FaCalendarAlt className="absolute left-3 text-gray-500" />
            <DatePicker selected={dateRange.endDate} onChange={(date) => setDateRange((prev) => ({ ...prev, endDate: date }))} selectsEnd startDate={dateRange.startDate} endDate={dateRange.endDate} minDate={dateRange.startDate} placeholderText="Check-out" className="bg-transparent flex-1 pl-10 text-black focus:outline-none" />
          </div>

          <div className="relative flex items-center bg-gray-100 p-2 rounded-lg w-full md:w-1/6 border border-gray-300">
            <FaUserFriends className="absolute left-3 text-gray-500" />
            <input type="number" min="1" value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="bg-transparent flex-1 pl-10 text-gray-600 focus:outline-none no-spinner" placeholder="Guests" />
          </div>

          <button onClick={handleSearch} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg w-full md:w-auto">
            Search
          </button>
        </div>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default HeroSection;
