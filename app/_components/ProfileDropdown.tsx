"use client";
import { auth } from "../../firebaseConfig"; // Adjust this path as needed
import React, { useState, useEffect, useRef } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";

const ProfileDropdown: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/"); // Redirect to homepage after sign out
  };

  const handleModalClose = () => {
    setDropdownOpen(false);
  };

  const getDisplayName = () => {
    if (user) {
      if (user.displayName) {
        return user.displayName;
      } else if (user.email) {
        return user.email.split("@")[0]; // Show only the part before the @ symbol
      }
    }
    return "";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 hover:text-[#FFF2E5] transition duration-200">
        <CgProfile size={20} />
        <span>Profile</span>
      </button>
      {dropdownOpen && !isMobile && (
        <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-10">
          {user ? (
            <div className="p-4">
              <p className="text-sm font-semibold">Welcome, {getDisplayName()}</p>
              <Link href="/accountSettings">
                <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">Account Settings</button>
              </Link>
              <Link href="/bookings">
                <button className="mt-2 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">My Bookings</button>
              </Link>
              <button onClick={handleSignOut} className="mt-2 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors">
                Sign Out
              </button>
            </div>
          ) : (
            <div className="p-4">
              <Link href="/login">
                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">Sign In</button>
              </Link>
              <Link href="/register">
                <button className="mt-2 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">Register</button>
              </Link>
            </div>
          )}
        </div>
      )}
      {dropdownOpen && isMobile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg shadow-lg w-full h-full p-6 relative">
            <button onClick={handleModalClose} className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 text-2xl">
              &times;
            </button>
            {user ? (
              <div className="mt-10">
                <p className="text-lg font-semibold mb-4">Welcome, {getDisplayName()}</p>
                <Link href="/accountSettings">
                  <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors mb-4">Account Settings</button>
                </Link>
                <Link href="/bookings">
                  <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors mb-4">My Bookings</button>
                </Link>
                <button onClick={handleSignOut} className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors">
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="mt-10">
                <Link href="/login">
                  <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors mb-4">Sign In</button>
                </Link>
                <Link href="/register">
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">Register</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
