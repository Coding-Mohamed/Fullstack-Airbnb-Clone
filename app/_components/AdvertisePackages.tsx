import Link from "next/link";
import React from "react";
import { FaBoxOpen, FaClipboardList, FaMapMarkedAlt, FaTags } from "react-icons/fa"; // Import icons from React Icons

const AdvertisePackages = () => {
  const features = [
    {
      title: "Easy Package Management",
      description: "Manage your packages effortlessly with our intuitive interface.",
      icon: <FaClipboardList className="text-3xl text-green-500" />,
    },
    {
      title: "Reach More Customers",
      description: "Expand your reach and attract more customers with our platform.",
      icon: <FaMapMarkedAlt className="text-3xl text-green-500" />,
    },
    {
      title: "Flexible Pricing",
      description: "Set competitive prices and offer discounts to attract more bookings.",
      icon: <FaTags className="text-3xl text-green-500" />,
    },
    {
      title: "Comprehensive Support",
      description: "Get 24/7 support to help you manage your packages effectively.",
      icon: <FaBoxOpen className="text-3xl text-green-500" />,
    },
  ];

  return (
    <div className="flex flex-col items-center p-5">
      <h2 className="text-2xl font-bold mb-6">Why List Your Packages with Us?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 text-center flex flex-col items-center">
            <div className="flex items-center justify-center mb-2" style={{ height: "60px" }}>
              {feature.icon}
              <h3 className="font-semibold text-lg ml-2">{feature.title}</h3>
            </div>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="relative w-full max-w-6xl h-[60vh] bg-cover bg-center rounded-2xl overflow-hidden" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60')` }}>
        <div className="absolute inset-0 bg-black opacity-50 rounded-2xl"></div>
        <div className="relative z-10 flex flex-col items-start justify-center h-full text-left text-white px-4 ml-10">
          <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-md">
            <h2 className="text-lg font-bold mb-4 text-black">List Your Packages with Confidence on Nordic Exp</h2>
            <p className="text-sm text-black mb-6">Enjoy seamless package management with 24/7 support, easy setup, and top-rated customers. Listing packages on Nordic is as relaxing as a vacation.</p>
            <Link href="/add-packages">
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg">List Your Packages</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisePackages;
