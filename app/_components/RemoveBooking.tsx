"use client";
import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

interface RemoveBookingProps {
  booking: {
    id: string;
    houseId: string;
    fullName?: string;
    secretNumber?: string;
    startDate: string;
    endDate: string;
    title: string;
    houseLocation?: string;
  };
  onDelete: (id: string) => void;
}

const RemoveBooking: React.FC<RemoveBookingProps> = ({ booking, onDelete }) => {
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "bookings", booking.id));
      onDelete(booking.id); // Trigger state update in MyBookings after deletion
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const timeLeft = new Date(booking.startDate).getTime() - new Date().getTime();
  const hoursLeft = timeLeft / (1000 * 60 * 60);

  return (
    <div className="mt-4">
      {hoursLeft > 24 ? (
        <button onClick={handleDelete} className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors">
          Cancel Booking
        </button>
      ) : (
        <p className="text-red-500">Cannot cancel booking with less than 24 hours left.</p>
      )}
    </div>
  );
};

export default RemoveBooking;
