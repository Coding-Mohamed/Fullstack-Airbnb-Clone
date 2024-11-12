"use client";
import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { db } from "../../firebaseConfig"; // Adjust the path as necessary

const storage = getStorage();
const auth = getAuth();

const AddListingComponent: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    description: "",
    bedrooms: 1,
    bathrooms: 1,
    amenities: "",
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
      else setShowPopup(true);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImageFiles([...imageFiles, ...Array.from(e.target.files)]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setShowPopup(true);
      return;
    }

    const uploadedImageURLs: string[] = [];
    for (const file of imageFiles) {
      const fileRef = ref(storage, `images/${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      uploadedImageURLs.push(url);
    }

    const listingData = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      bedrooms: parseInt(formData.bedrooms as any, 10),
      bathrooms: parseInt(formData.bathrooms as any, 10),
      amenities: formData.amenities.split(",").map((item) => item.trim()),
      images: uploadedImageURLs,
    };

    try {
      await addDoc(collection(db, "listings"), listingData);
      alert("Listing added successfully!");
      setFormData({
        title: "",
        location: "",
        price: "",
        description: "",
        bedrooms: 1,
        bathrooms: 1,
        amenities: "",
      });
      setImageFiles([]);
    } catch (error) {
      console.error("Error adding listing:", error);
    }
  };

  if (!user) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-11/12 max-w-md text-center space-y-6">
          <div className="flex items-center justify-center mb-4">
            <button onClick={() => router.push("/")} className="text-gray-600 hover:text-gray-800 text-2xl mr-2" aria-label="Go back">
              <FaArrowLeft />
            </button>
            <h2 className="text-xl font-bold text-gray-800">Sign In Required</h2>
          </div>
          <p className="text-lg text-gray-700">Please sign in or register to add a listing.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/login">
              <button className="w-28 py-2 bg-blue-500 text-white rounded-lg font-medium text-lg hover:bg-blue-600 transition duration-200">Sign In</button>
            </Link>
            <Link href="/register">
              <button className="w-28 py-2 bg-green-500 text-white rounded-lg font-medium text-lg hover:bg-green-600 transition duration-200">Register</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg space-y-5">
        <div className="flex items-center justify-center mb-4">
          <button onClick={() => router.push("/")} className="text-gray-600 hover:text-gray-800 text-2xl mr-2" aria-label="Go back">
            <FaArrowLeft />
          </button>
          <h2 className="text-xl font-bold text-gray-800">Add New Listing</h2>
        </div>
        {["title", "location", "price", "description", "bedrooms", "bathrooms"].map((field) => (
          <div key={field}>
            <label className="block text-lg font-medium text-gray-600 mb-1 capitalize">{field}</label>
            <input type={field === "price" || field === "bedrooms" || field === "bathrooms" ? "number" : "text"} name={field} value={(formData as any)[field]} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none" required />
          </div>
        ))}
        <div>
          <label className="block text-lg font-medium text-gray-600 mb-1">Amenities (comma-separated)</label>
          <input type="text" name="amenities" value={formData.amenities} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none" required />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-600 mb-1">Upload Images</label>
          <input type="file" multiple onChange={handleFileChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none" />
          <div className="flex flex-wrap gap-2 mt-4">
            {imageFiles.map((file, index) => (
              <img key={index} src={URL.createObjectURL(file)} alt={`Preview ${index}`} className="w-24 h-24 object-cover rounded-md" />
            ))}
          </div>
        </div>
        <button type="submit" className="w-full py-3 mt-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200">
          Add Listing
        </button>
      </form>
    </div>
  );
};

export default AddListingComponent;
