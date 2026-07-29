"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { CartContext } from "./context/CartContext";
import { products } from "./data/products";

export default function Home() {
  const { cart, setCart, wishlist, setWishlist } = useContext(CartContext);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  

  const addToCart = (product: any) => {
    const existingProduct = cart.find(
      (item: any) => item.name === product.name
    );

    if (existingProduct) {
      const updatedCart = cart.map((item: any) =>
        item.name === product.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const filteredProducts = products.filter((product) => {

  const matchesSearch = product.name
    .toLowerCase()
    .includes(search.toLowerCase());


  const matchesCategory =
    category === "All" || product.category === category;


  return matchesSearch && matchesCategory;

});

  return (
    <main className="min-h-screen bg-gray-100">

      <section className="p-10">

        <h2 className="text-3xl font-bold text-black">
          Welcome to Our Store
        </h2>

        <p className="text-gray-700 mt-2">
          We sell laptops, mobiles and accessories.
        </p>

        {/* Search */}

        <input
          type="text"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-400 rounded-lg p-3 mt-6 text-black bg-white placeholder-gray-500"
        />
        <div className="flex gap-3 mt-6 mb-6">

      <button
        onClick={() => setCategory("All")}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        All
      </button>

      <button
        onClick={() => setCategory("Laptop")}
        className="bg-gray-700 text-white px-4 py-2 rounded-lg"
      >
        💻 Laptop
      </button>

      <button
        onClick={() => setCategory("Mobile")}
        className="bg-gray-700 text-white px-4 py-2 rounded-lg"
      >
        📱 Mobile
      </button>

      <button
        onClick={() => setCategory("Headphones")}
        className="bg-gray-700 text-white px-4 py-2 rounded-lg"
      >
        🎧 Headphones
      </button>

      <button
        onClick={() => setCategory("Watch")}
        className="bg-gray-700 text-white px-4 py-2 rounded-lg"
      >
        ⌚ Watch
      </button>

    </div>

        {/* Products */}

        <div className="grid grid-cols-4 gap-6 mt-10">

          {filteredProducts.map((product, index) => (

            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-5 flex flex-col"
            >
            <div className="bg-red-600 text-white text-sm font-semibold px-2 py-1 rounded w-fit mb-2">
              {product.discount}
            </div>

          <Link href={`/product/${product.name}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg cursor-pointer"
            />
          </Link>

              <h2 className="text-2xl font-bold mt-4 text-black">
                {product.name}
              </h2>

              <p className="text-gray-700 mt-2">
                {product.description}
              </p>

              <p className="text-yellow-500 text-lg mt-2">
                {product.rating}
              </p>


              <p className="text-xl font-bold text-green-700 mt-2">
                {product.price}
              </p>
              <button
                onClick={() => {
                  const exists = wishlist.find(
                    (item: any) => item.name === product.name
                  );

                  if (exists) {
                    setWishlist(
                      wishlist.filter(
                        (item: any) => item.name !== product.name
                      )
                    );
                  } else {
                    setWishlist([...wishlist, product]);
                  }
                }}
                className="mb-2 w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg"
              >
                {wishlist.find((item: any) => item.name === product.name)
                  ? "❤️ Remove from Wishlist"
                  : "🤍 Add to Wishlist"}
              </button>

              <button
                onClick={() => addToCart(product)}
                className="mt-4 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
              >
                Add to Cart
              </button>

            </div>

          ))}

        </div>

      </section>

    </main>
  );
}