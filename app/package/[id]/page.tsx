"use client";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { notFound } from "next/navigation";
import Link from "next/link";
import BookingForm from "@/app/_components/BookingForm";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// interface House {
//   id: string;
//   title: string;
//   location: string;
//   price: number;
//   description: string;
//   amenities: string[];
//   images: string[];
//   duration: string;
// }

interface PackageDetailsProps {
  params: { id: string };
}

const PackageDetails: React.FC<PackageDetailsProps> = ({ params }) => {
  const [house, setHouse] = useState<House | null>(null);

  useEffect(() => {
    const fetchHouse = async () => {
      const docRef = doc(db, "packages", params.id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        notFound();
      } else {
        setHouse({ id: docSnap.id, ...docSnap.data() } as House);
      }
    };
    fetchHouse();
  }, [params.id]);

  if (!house) return <div>Loading...</div>;

  return (
    <div className="p-4 md:p-10 mt-5">
      <h2 className="text-3xl font-semibold mb-6 text-center">Listing Details</h2>
      <Link href="/" className="text-blue-500 mb-6 inline-block text-sm md:text-base">
        &larr; Back
      </Link>

      {/* Image Carousel */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-3xl mx-auto cursor-pointer">
        <ImageCarousel images={house.images} />

        <div className="p-6 space-y-4">
          {/* Title and Location */}
          <div className="flex justify-between items-center text-gray-800">
            <h3 className="text-2xl font-bold truncate">{house.title}</h3>
            <p className="text-sm text-gray-500">{house.location}</p>
          </div>

          {/* Price and Rating */}
          <div className="flex justify-between items-center text-gray-800">
            <p className="text-xl font-semibold">
              ${house.price} <span className="text-sm font-normal">per night</span>
            </p>
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">★</span>
              <span className="text-gray-600 font-medium">{(Math.random() * (5 - 4) + 4).toFixed(2)}</span>
            </div>
          </div>

          {/* Duration */}
          <p className="text-gray-600 text-sm">Duration: {house.duration}</p>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed">{house.description}</p>
        </div>
      </div>

      <div className="mt-8">
        <BookingForm houseId={house.id} title={house.title} location={house.location} imageURL={house.images[0]} type="package" />
      </div>
    </div>
  );
};

// Carousel Component
const ImageCarousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => setCurrentIndex((currentIndex + 1) % images.length);
  const prevImage = () => setCurrentIndex((currentIndex - 1 + images.length) % images.length);

  return (
    <div className="relative w-full h-64 md:h-96">
      <img src={images[currentIndex]} alt={`Listing image ${currentIndex + 1}`} className="w-full h-full object-cover" />

      {/* Left Arrow */}
      {images.length > 1 && (
        <>
          <button onClick={prevImage} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full">
            <FaArrowLeft />
          </button>

          {/* Right Arrow */}
          <button onClick={nextImage} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full">
            <FaArrowRight />
          </button>
        </>
      )}
    </div>
  );
};

export default PackageDetails;
