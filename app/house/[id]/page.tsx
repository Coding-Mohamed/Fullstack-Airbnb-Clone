"use client";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { notFound } from "next/navigation";
import Link from "next/link";
import BookingForm from "@/app/_components/BookingForm";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface HouseDetailsProps {
  params: { id: string };
}

// Define the component as async to fetch data
const HouseDetails: React.FC<HouseDetailsProps> = async ({ params }) => {
  const docRef = doc(db, "listings", params.id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    notFound();
  }

  const house = { id: docSnap.id, ...docSnap.data() } as House;

  return (
    <div className="p-5  md:p-10 mt-5">
      <h2 className="text-2xl font-bold mb-4 text-center">Listing Details</h2>
      <Link href="/" className="text-blue-500 mb-4 ml-10 inline-block">
        &larr; Back
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-3xl mx-auto cursor-pointer">
        <ImageCarousel images={house.images} />
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{house.title}</h2>
            <p className="text-gray-500">{house.location}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold">
              ${house.price} <span className="text-sm">per night</span>
            </p>
            <div className="flex items-center">
              <span className="text-red-500 mr-2">★</span>
              <span>{(Math.random() * (5 - 4) + 4).toFixed(2)}</span>
            </div>
          </div>
          <p className="text-sm mt-4 mb-4 line-clamp-3">{house.description}</p>
          <div className="flex gap-2 mb-4">
            <span className="bg-gray-100 px-2 py-1 rounded text-xs">{house.number_of_bedrooms} Bedrooms</span>
            <span className="bg-gray-100 px-2 py-1 rounded text-xs">{house.number_of_bathrooms} Bathrooms</span>
          </div>
          <div className="mb-4">
            <h3 className="text-md font-semibold">Amenities:</h3>
            <ul className="list-none flex flex-wrap gap-1 mt-2 max-h-16 overflow-hidden">
              {house.amenities.map((amenity, index) => (
                <li key={index} className="bg-gray-200 px-2 py-1 text-xs rounded-full">
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <BookingForm houseId={house.id} title={house.title} location={house.location} imageURL={house.images[0]} type="listing" />
      </div>
    </div>
  );
};

const ImageCarousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle next image (loop back to first image if at the end)
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Handle previous image (loop back to last image if at the start)
  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-64 md:h-96">
      <img src={images[currentIndex]} alt={`Listing image ${currentIndex + 1}`} className="w-full h-full object-cover" />

      {/* Left Arrow */}
      {images.length > 1 && (
        <button onClick={prevImage} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full">
          <FaArrowLeft />
        </button>
      )}

      {/* Right Arrow */}
      {images.length > 1 && (
        <button onClick={nextImage} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full">
          <FaArrowRight />
        </button>
      )}
    </div>
  );
};

export default HouseDetails;
