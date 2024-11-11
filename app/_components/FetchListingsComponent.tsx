// "use client";
// import React, { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../firebaseConfig";
// import Link from "next/link"; // For linking to individual listings

// interface Listing {
//   id: string;
//   title: string;
//   location: string;
//   price: number;
//   description: string;
//   number_of_bedrooms: number;
//   number_of_bathrooms: number;
//   amenities: string[];
//   images: string[];
// }

// const FetchListingsComponent: React.FC = () => {
//   const [listings, setListings] = useState<Listing[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchListings = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "listings"));
//         const listingsData: Listing[] = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         })) as Listing[];
//         setListings(listingsData);
//         setLoading(false);
//       } catch (e) {
//         console.error("Error fetching listings: ", e);
//         setError("Failed to fetch listings");
//         setLoading(false);
//       }
//     };

//     fetchListings();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="p-5 mt-5">
//       <h2 className="text-2xl font-bold mb-4 text-center">Listings</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {listings.map((listing) => (
//           <Link key={listing.id} href={`/listing/${listing.id}`}>
//             <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
//               <div className="relative pb-2/3">
//                 <img src={listing.images?.[0]} alt={listing.title} className="w-full h-48 object-cover" />
//               </div>
//               <div className="p-4">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-lg font-semibold truncate">{listing.title}</h2>
//                   <p className="text-gray-500 text-sm">{listing.location}</p>
//                 </div>
//                 <div className="flex justify-between items-center mt-2">
//                   <p className="text-lg font-bold">
//                     ${listing.price} <span className="text-sm">per night</span>
//                   </p>
//                   <div className="flex items-center">
//                     <span className="text-red-500 mr-2">★</span>
//                     <span>{(Math.random() * (5 - 4) + 4).toFixed(2)}</span> {/* Random star rating */}
//                   </div>
//                 </div>
//                 <div className="mt-4 flex gap-2">
//                   <span className="bg-gray-100 px-2 py-1 rounded text-xs">{listing.number_of_bedrooms} Bedrooms</span>
//                   <span className="bg-gray-100 px-2 py-1 rounded text-xs">{listing.number_of_bathrooms} Bathrooms</span>
//                 </div>
//                 <div className="mt-4 line-clamp-3">
//                   <p className="text-sm">{listing.description}</p>
//                 </div>
//                 <div className="mt-4">
//                   <h3 className="text-md font-semibold">Amenities:</h3>
//                   <ul className="list-none flex flex-wrap gap-1 mt-2 max-h-16 overflow-hidden">
//                     {listing.amenities.map((amenity: string, index: number) => (
//                       <li key={index} className="bg-gray-200 px-2 py-1 text-xs rounded-full">
//                         {amenity}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FetchListingsComponent;
