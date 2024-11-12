import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Link from "next/link"; // For linking to individual listings
import { FaArrowLeft } from "react-icons/fa";

interface Listing {
  id: string;
  title: string;
  location: string;
  price: number;
  description: string;
  number_of_bedrooms: number;
  number_of_bathrooms: number;
  amenities: string[];
  images: string[];
  uid: string;
}

const ServerListings: React.FC = async () => {
  //   const [listings, setListings] = useState<Listing[]>([]);
  //   const [loading, setLoading] = useState<boolean>(true);
  //   const [error, setError] = useState<string | null>(null);

  const querySnapshot = await getDocs(collection(db, "listings"));
  const listings: Listing[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    uid: doc.id,
    ...doc.data(),
  })) as Listing[];

  if (!listings) {
    return <div>Loading...</div>;
  }

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

  return (
    <div className="p-4 sm:p-6 lg:p-10 mt-5">
      <div className="flex items-center justify-between mb-6">
        <Link href="/">
          <span className="text-gray-600 hover:text-gray-800 text-2xl">
            <FaArrowLeft />
          </span>
        </Link>

        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center flex-1">Discover Your Dream Home Away From Home</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {listings.map((listing) => (
          <Link key={listing.uid} href={`/house/${listing.uid}`} className="bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
            <div className="relative">
              <img src={listing.images?.[0]} alt={listing.title} className="w-full h-48 object-cover rounded-t-lg" />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold truncate">{listing.title}</h2>
                <p className="text-gray-500 text-sm">{listing.location}</p>
              </div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm font-bold">
                  ${listing.price} <span className="text-xs">per night</span>
                </p>
                <div className="flex items-center">
                  <span className="text-red-500 mr-1">★</span>
                  <span>{(Math.random() * (5 - 4) + 4).toFixed(2)}</span>
                </div>
              </div>
              <div className="flex gap-2 mb-4">
                <span className="bg-gray-100 px-2 py-1 rounded text-xs">{listing.number_of_bedrooms} Bedrooms</span>
                <span className="bg-gray-100 px-2 py-1 rounded text-xs">{listing.number_of_bathrooms} Bathrooms</span>
              </div>
              <p className="text-sm line-clamp-3 mb-4">{listing.description}</p>
              <h3 className="text-md font-semibold mb-2">Amenities:</h3>
              <ul className="list-none flex flex-wrap gap-1 max-h-16 overflow-hidden">
                {listing.amenities.map((amenity, index) => (
                  <li key={index} className="bg-gray-200 px-2 py-1 text-xs rounded-md">
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServerListings;
