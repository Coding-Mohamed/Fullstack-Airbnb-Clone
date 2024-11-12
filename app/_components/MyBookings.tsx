"use client";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import RemoveBooking from "./RemoveBooking";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";

interface Booking {
  id: string;
  houseId: string;
  type: string;
  title: string;
  imageURL: string;
  startDate: string;
  endDate: string;
  location?: string;
}

const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const bookingsRef = collection(db, "bookings");
        const q = query(bookingsRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const fetchedBookings: Booking[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          houseId: doc.data().houseId,
          type: doc.data().type,
          title: doc.data().title,
          imageURL: doc.data().imageURL,
          startDate: doc.data().startDate,
          endDate: doc.data().endDate,
          location: doc.data().location,
        })) as Booking[];

        setBookings(fetchedBookings);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleDelete = (id: string) => {
    setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== id));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5 mt-5">
      <div className="flex items-center mb-6">
        <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-800 text-2xl">
          <FaArrowLeft />
        </button>
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold ml-4">My Bookings</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <img src={booking.imageURL} alt={booking.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold truncate">{booking.title}</h3>
                <p className="text-sm text-gray-500">{booking.location}</p>
              </div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">{booking.type}</p>
                <div className="flex items-center">
                  <span className="text-red-500 mr-1">★</span>
                  <span>{(Math.random() * (5 - 4) + 4).toFixed(2)}</span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0 md:space-x-2">
                <div className="flex items-center bg-gray-100 p-2 rounded-lg w-full md:w-auto">
                  <FaCalendarAlt className="text-gray-500 mr-2" />
                  <p className="text-gray-700">
                    <span className="font-medium">Start:</span> {new Date(booking.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center bg-gray-100 p-2 rounded-lg w-full md:w-auto">
                  <FaCalendarAlt className="text-gray-500 mr-2" />
                  <p className="text-gray-700">
                    <span className="font-medium">End:</span> {new Date(booking.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <RemoveBooking booking={booking} onDelete={handleDelete} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
