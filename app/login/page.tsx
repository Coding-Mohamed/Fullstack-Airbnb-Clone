"use client";
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import firebaseApp from "../../firebaseConfig"; // Import the initialized firebase app

const auth = getAuth(firebaseApp); // Initialize auth with the firebase app
const googleProvider = new GoogleAuthProvider();

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (!user.displayName) {
        const displayName = email.split("@")[0]; // Use the part before the @ symbol as the display name
        await updateProfile(user, { displayName });
      }
      router.push("/"); // Redirect to homepage after login
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      if (!user.displayName) {
        const displayName = user.email.split("@")[0]; // Use the part before the @ symbol as the display name
        await updateProfile(user, { displayName });
      }
      router.push("/"); // Redirect to homepage after login
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <button onClick={handleGoogleLogin} className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors">
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
