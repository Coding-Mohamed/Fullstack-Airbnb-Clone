"use client";
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import RemoveBooking from "./RemoveBooking";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

// interface Booking {
//   id: string;
//   houseId: string; // Ensure this line is included
//   type: string;
//   title: string;
//   imageURL: string;
//   startDate: string;
//   endDate: string;
//   location?: string;
// }

const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchBookings = async () => {
      const user = auth.currentUser;
      if (user) {
        const bookingsRef = collection(db, "bookings");
        const q = query(bookingsRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const fetchedBookings: Booking[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          houseId: doc.data().houseId, // Ensure houseId is set
          type: doc.data().type,
          title: doc.data().title,
          imageURL: doc.data().imageURL,
          startDate: doc.data().startDate,
          endDate: doc.data().endDate,
          location: doc.data().location,
        })) as Booking[];

        setBookings(fetchedBookings);
      }
    };

    fetchBookings();
  }, [auth]);

  const handleDelete = (id: string) => {
    setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== id));
  };

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
          <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={booking.imageURL} alt={booking.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-bold">{booking.title}</h3>
              <p className="text-gray-500">{booking.type}</p>
              <p className="text-sm">Start: {booking.startDate}</p>
              <p className="text-sm">End: {booking.endDate}</p>
              <p className="text-sm text-gray-500">{booking.location}</p>
              <RemoveBooking booking={booking} onDelete={handleDelete} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
