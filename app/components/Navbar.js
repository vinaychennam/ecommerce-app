"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const {
    cart,
    wishlist,
    darkMode,
    setDarkMode,
  } = useContext(CartContext);

  const router = useRouter();

  // Logged-in user
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Check login status
  useEffect(() => {
    const checkLoginStatus = () => {
      const user = localStorage.getItem("loggedInUser");

      if (user) {
        setLoggedInUser(JSON.parse(user));
      } else {
        setLoggedInUser(null);
      }
    };

    checkLoginStatus();

    window.addEventListener(
      "loginStatusChanged",
      checkLoginStatus
    );

    return () => {
      window.removeEventListener(
        "loginStatusChanged",
        checkLoginStatus
      );
    };
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");

    setLoggedInUser(null);

    window.dispatchEvent(
      new Event("loginStatusChanged")
    );

    router.push("/");
  };

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">

      {/* Store Name */}
      <h1 className="text-2xl font-bold">
        Vinay Electronics Store
      </h1>

      {/* Navigation */}
      <ul className="flex gap-6 items-center">

        {/* Home */}
        <li>
          <Link href="/">
            Home
          </Link>
        </li>

        {/* Wishlist */}
        <li>
          <Link href="/wishlist">
            ❤️ ({wishlist.length})
          </Link>
        </li>

        {/* Cart */}
        <li>
          <Link href="/cart">
            🛒 ({cart.length})
          </Link>
        </li>

        {/* Orders */}
        <li>
          <Link href="/orders">
            📦 Orders
          </Link>
        </li>

        {/* Login / Account / Logout */}
        {loggedInUser ? (
          <>
            {/* Account */}
            <li>
              <Link
                href="/account"
                className="hover:text-blue-300"
              >
                👤 {loggedInUser.name}
              </Link>
            </li>

            {/* Logout */}
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg"
              >
                🚪 Logout
              </button>
            </li>
          </>
        ) : (
          /* Login */
          <li>
            <Link
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg"
            >
              🔐 Login
            </Link>
          </li>
        )}

        {/* Dark Mode */}
        <li>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </li>

      </ul>

    </nav>
  );
}