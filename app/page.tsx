"use client";

import { useState, useContext } from "react";
import Link from "next/link";
import { CartContext } from "./context/CartContext";
export default function Home() {

  const { cart, setCart } = useContext(CartContext);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };
  return (
    <main className="min-h-screen bg-gray-100">

      {/* Navigation Bar */}
      <nav className="bg-black text-white p-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          Vinay Electronics Store
        </h1>

        <ul className="flex gap-6">
          <li>Home</li>
          <li>Products</li>
          <li>About</li>
          <li>
            <Link href="/cart">
            Cart 🛒 ({cart.length})
          </Link>
          </li>
        </ul>

      </nav>

      {/* Main Content */}

      <section className="p-10">

        <h2 className="text-2xl font-bold mt-4 text-black">
          Welcome to Our Store
        </h2>

        <p className="text-gray-800 mt-2">
          We sell laptops, mobiles and accessories.
        </p>

        <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg">
          Browse Products
        </button>
        <div className="mt-10 grid grid-cols-4 gap-6">

  {/* Product 1 */}
  <div className="bg-white p-5 rounded-lg shadow-lg">
    <div className="h-40 bg-gray-300 rounded-lg flex items-center justify-center">
      💻 Laptop
    </div>

    <h2 className="text-2xl font-bold mt-4 text-black">
      Dell Inspiron 15
    </h2>

    <p className="text-gray-800 mt-2">
      Intel i5 | 16GB RAM
    </p>

    <p className="text-gray-800 mt-2">
      $799
    </p>

    <button
  onClick={() =>
  addToCart({
    name: "Dell Inspiron 15",
    price: "$799"
  })
}
  className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg"
>
  Add to Cart
</button>
  </div>

  {/* Product 2 */}

  <div className="bg-white p-5 rounded-lg shadow-lg">
    <div className="h-40 bg-gray-300 rounded-lg flex items-center justify-center">
      📱 Mobile
    </div>

    <h2 className="text-2xl font-bold mt-4 text-black">
      iPhone 15
    </h2>

    <p className="text-gray-800 mt-2">
    128GB Storage
    </p>

    <p className="text-gray-800 mt-2">
      $999
    </p>

    <button
  onClick={() =>
    addToCart({
      name: "iPhone 15",
      price: "$999"
    })
  }
  className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg"
>
  Add to Cart
</button>
  </div>

  {/* Product 3 */}

  <div className="bg-white p-5 rounded-lg shadow-lg">
    <div className="h-40 bg-gray-300 rounded-lg flex items-center justify-center">
      🎧 Headphones
    </div>

    <h2 className="text-2xl font-bold mt-4 text-black">
      Sony Headphones
    </h2>

    <p className="text-gray-800 mt-2">Noise Cancelling</p>

    <p className="text-gray-800 mt-2">
      $199
    </p>

    <button
  onClick={() =>
    addToCart({
      name: "Sony Headphones",
      price: "$199"
    })
  }
  className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg"
>
  Add to Cart
</button>
  </div>

  {/* Product 4 */}

  <div className="bg-white p-5 rounded-lg shadow-lg">
    <div className="h-40 bg-gray-300 rounded-lg flex items-center justify-center">
      ⌚ Smart Watch
    </div>

    <h2 className="text-2xl font-bold mt-4 text-black">
      Apple Watch
    </h2>

    <p className="text-gray-800 mt-2">
      Series 10
      </p>

    <p className="text-gray-800 mt-2">
      $499
    </p>

   <button
  onClick={() =>
    addToCart({
      name: "Apple Watch",
      price: "$499"
    })
  }
  className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg"
>
  Add to Cart
</button>
  </div>

</div>

      </section>

    </main>
  );
}