// src/components/AdvertiseWithUs.jsx
// eslint-disable-next-line no-unused-vars
import Link from "next/link";
import React from "react";
import { FaShieldAlt, FaClock, FaHome, FaMoneyBillWave } from "react-icons/fa"; // Import icons from React Icons

const AdvertiseWithUs = () => {
  const badges = [
    {
      title: "Safe and Secure",
      description: "With our booking guarantee, you receive 24/7 support.",
      icon: <FaShieldAlt className="text-3xl text-orange-500" />,
    },
    {
      title: "More Quality Time",
      description: "The entire process is easy and enjoyable – from booking to stay.",
      icon: <FaClock className="text-3xl text-orange-500" />,
    },
    {
      title: "As Comfortable as Home",
      description: "Enjoy fully equipped kitchens, laundry facilities, pools, gardens, and more.",
      icon: <FaHome className="text-3xl text-orange-500" />,
    },
    {
      title: "More for Less",
      description: "Larger spaces, more privacy, more amenities – more value.",
      icon: <FaMoneyBillWave className="text-3xl text-orange-500" />,
    },
  ];

  return (
    <div className="flex flex-col items-center p-5">
      {/* Badges Section */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {badges.map((badge, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 text-center max-w-xs flex flex-col items-center">
            <div className="flex items-center justify-center mb-2" style={{ height: "60px" }}>
              {badge.icon}
              <h3 className="font-semibold text-lg ml-2">{badge.title}</h3>
            </div>
            <p className="text-sm text-gray-600">{badge.description}</p>
          </div>
        ))}
      </div>

      {/* Background Image Section */}
      <div className="relative w-full max-w-6xl h-[60vh] bg-cover bg-center rounded-2xl overflow-hidden" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60')` }}>
        <div className="absolute inset-0 bg-black opacity-50 rounded-2xl"></div>
        <div className="relative z-10 flex flex-col items-start justify-center h-full text-left text-white px-4 ml-10">
          <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-md">
            <h2 className="text-lg font-bold mb-4 text-black">List Your Property with Confidence on Nordic Exp</h2>
            <p className="text-sm text-black mb-6">Enjoy seamless hosting with 24/7 support, easy setup, and top-rated guests. Hosting on Nordic is as relaxing as a vacation.</p>
            <Link href="/Listings">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg">List with Us</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertiseWithUs;
