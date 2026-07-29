"use client";

import { useContext } from "react";
import Link from "next/link";
import { CartContext } from "../context/CartContext";

export default function Wishlist() {
  const { wishlist, setWishlist } = useContext(CartContext);

  const removeFromWishlist = (productName) => {
    const updatedWishlist = wishlist.filter(
      (item) => item.name !== productName
    );
    setWishlist(updatedWishlist);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold text-black mb-6">
        My Wishlist ❤️
      </h1>

      {wishlist.length === 0 ? (
        <>
          <p className="text-gray-700">
            Your wishlist is empty.
          </p>

          <Link href="/">
            <button className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg">
              Continue Shopping
            </button>
          </Link>
        </>
      ) : (
        <>
          {wishlist.map((item, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-lg shadow-lg flex justify-between items-center mb-5"
            >
              <div className="flex items-center gap-5">

            <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 object-contain rounded-lg"
            />

            <div>
                <h2 className="text-xl font-bold text-black">
                {item.name}
                </h2>

                <p className="text-gray-700">
                {item.description}
                </p>

                <p className="text-green-700 font-bold">
                {item.price}
                </p>
            </div>

            </div>

              <button
                onClick={() => removeFromWishlist(item.name)}
                className="bg-red-600 text-white px-5 py-2 rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}

          <Link href="/">
            <button className="bg-green-600 text-white px-5 py-2 rounded-lg">
              Continue Shopping
            </button>
          </Link>
        </>
      )}

    </main>
  );
}