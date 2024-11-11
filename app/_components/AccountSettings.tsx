"use client";
import React, { useState, useEffect } from "react";
import { getAuth, updateProfile, updateEmail, updatePassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { auth } from "../../firebaseConfig"; // Adjust this path as needed

const AccountSettings: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [displayName, setDisplayName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setDisplayName(currentUser.displayName || "");
      setEmail(currentUser.email || "");
    }
  }, []);

  const handleUpdateProfile = async () => {
    if (user) {
      try {
        await updateProfile(user, { displayName });
        await updateEmail(user, email);
        if (password) {
          await updatePassword(user, password);
        }
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile. Please try again.");
      }
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 mt-5">
      <div className="flex items-center mb-6">
        <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-800 text-2xl">
          <FaArrowLeft />
        </button>
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold ml-4">Account Settings</h2>
      </div>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Display Name</label>
          <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="Leave blank to keep current password" />
        </div>
        <button onClick={handleUpdateProfile} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;
