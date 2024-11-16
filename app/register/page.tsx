"use client";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import app from "../../firebaseConfig";

// Initialize Firebase Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const RegisterForm: React.FC = () => {
  // State to handle form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  // Reusable function to handle form input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to handle user registration with email and password
  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formData.password !== formData.passwordRepeat) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      const displayName = formData.email.split("@")[0]; // Use the part before the @ symbol as the display name
      await updateProfile(user, { displayName });
      router.push("/"); // Redirect to homepage after successful registration
    } catch (error) {
      if ((error as Error).message.includes("auth/email-already-in-use")) {
        setError("This email is already in use. Please use a different email.");
      } else {
        setError((error as Error).message);
      }
    }
  };

  // Function to handle registration with Google
  const handleGoogleRegister = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      const displayName = user.displayName || (user.email ? user.email.split("@")[0] : "User"); // Handle null email
      await updateProfile(user, { displayName });
      router.push("/"); // Redirect to homepage after successful registration
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Register</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} required className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium">Repeat Password</label>
            <input type="password" name="passwordRepeat" value={formData.passwordRepeat} onChange={handleInputChange} required className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <button onClick={handleGoogleRegister} className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors">
            Register with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
