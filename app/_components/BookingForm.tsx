"use client";
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { db } from "../../firebaseConfig";

const auth = getAuth();

interface BookingFormProps {
  houseId: string;
  title: string;
  imageURL: string;
  type: "listing" | "package";
  location: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ houseId, title, imageURL, type, location }) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [bookingData, setBookingData] = useState<{
    fullName: string;
    secretNumber: string;
    startDate: string;
    endDate: string;
  }>({
    fullName: "",
    secretNumber: "",
    startDate: "",
    endDate: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleSetBookingData = (fieldName: string, fieldValue: string) => {
    setBookingData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const handleBookingChange = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    handleSetBookingData(fieldName, fieldValue);
  };

  const handleBooking = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!user) {
      setError("You must be logged in to book.");
      return;
    }

    if (bookingData.secretNumber.length !== 4 || isNaN(Number(bookingData.secretNumber))) {
      setError("Secret number must be a 4-digit number.");
      return;
    }

    try {
      // Save booking details to Firestore with location
      await addDoc(collection(db, "bookings"), {
        houseId,
        userId: user.uid,
        fullName: bookingData.fullName,
        secretNumber: bookingData.secretNumber,
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
        title,
        imageURL,
        type,
        location, // Include location
      });
      alert("Booking successful!");
      router.push("/bookings"); // Redirect after successful booking
    } catch (error) {
      console.error("Error booking:", error);
      setError("Failed to book. Please try again.");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        handleSetBookingData("fullName", user.displayName || "");
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <div className="p-5 mt-5 bg-white rounded-lg shadow-lg w-10/12 mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">You must be logged in to book</h2>
        <div className="space-x-4">
          <Link href="/login">
            <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">Sign In</button>
          </Link>
          <Link href="/register">
            <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">Register</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 mt-5 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Book this {type === "listing" ? "Listing" : "Package"}</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleBooking} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium">Full Name</label>
          <input name="fullName" type="text" value={bookingData.fullName} onChange={handleBookingChange} required className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium">Secret 4-Digit Number</label>
          <input name="secretNumber" type="text" value={bookingData.secretNumber} onChange={handleBookingChange} required className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium">Start Date</label>
          <input name="startDate" type="date" value={bookingData.startDate} onChange={handleBookingChange} required className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium">End Date</label>
          <input name="endDate" type="date" value={bookingData.endDate} onChange={handleBookingChange} required min={bookingData.startDate} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
