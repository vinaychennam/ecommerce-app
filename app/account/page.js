"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Account() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(loggedInUser));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");

    toast.success("Logged out successfully!");

    router.push("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

        <div className="text-center mb-8">
          <div className="text-5xl mb-3">👤</div>

          <h1 className="text-3xl font-bold text-gray-800">
            My Account
          </h1>
        </div>

        <div className="mb-5">
          <p className="text-gray-500 text-sm">
            Full Name
          </p>

          <p className="text-lg font-semibold text-gray-900">
            {user.name}
          </p>
        </div>

        <div className="mb-5">
          <p className="text-gray-500 text-sm">
            Email
          </p>

          <p className="text-lg font-semibold text-gray-900">
            {user.email}
          </p>
        </div>

        <div className="mb-6">
          <p className="text-gray-500 text-sm">
            Password
          </p>

          <p className="text-lg font-semibold text-gray-900">
            ••••••••
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700"
        >
          Logout
        </button>

      </div>
    </div>
  );
}