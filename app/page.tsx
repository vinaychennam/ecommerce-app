"use client";

import { useContext, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { CartContext } from "./context/CartContext";
import { products } from "./data/products";

export default function Home() {
  const {
  cart,
  setCart,
  wishlist,
  setWishlist,
  darkMode,
  setDarkMode,
} = useContext(CartContext);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("");

  

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

    toast.success("Product quantity updated!");
  } else {
    setCart([
      ...cart,
      {
        ...product,
        quantity: 1,
      },
    ]);

    toast.success("Product added to cart!");
  }
};

  const filteredProducts = products
  .filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  })
  .sort((a, b) => {
    if (sortBy === "low-high") {
      return Number(a.price.replace("$", "")) - Number(b.price.replace("$", ""));
    }

    if (sortBy === "high-low") {
      return Number(b.price.replace("$", "")) - Number(a.price.replace("$", ""));
    }

    if (sortBy === "a-z") {
      return a.name.localeCompare(b.name);
    }

    if (sortBy === "z-a") {
      return b.name.localeCompare(a.name);
    }

    return 0;
  });
  return (
    <main
  className={`min-h-screen transition-colors duration-300 ${
    darkMode
      ? "bg-gray-900 text-white"
      : "bg-slate-100 text-black"
  }`}
>
      <section className="bg-[#0A192F] py-10">
  <div className="max-w-6xl mx-auto flex justify-between items-center">

    <div>

      <h1 className="text-5xl font-bold text-white">
        🔥 Big Sale - Up to 50% OFF
      </h1>

      <p className="text-xl mt-6 text-gray-200">
        Upgrade your setup with the latest laptops,
        mobiles, watches and accessories.
      </p>

      <a href="#products">
        <button className="mt-8 bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-300">
          Shop Now
        </button>
      </a>

    </div>

    <img
      src="/images/hero-banner.png"
      alt="Hero Banner"
      className="w-[650px] rounded-xl"
    />

  </div>

</section>

      <section id="products" className="p-10">

        <h2
          className={`text-3xl font-bold ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Welcome to Our Store
        </h2>

        <p 
          className={`mt-2 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
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
          <div className="flex justify-end mb-6">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-400 rounded-lg p-2 bg-white text-black"
        >
          <option value="">Sort By</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="a-z">Name: A-Z</option>
          <option value="z-a">Name: Z-A</option>
        </select>
      </div>

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
        <h2
          className={`text-4xl font-bold text-center mt-10 mb-10 ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          ⭐ Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

          {filteredProducts.map((product, index) => (

            <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-5 flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
          >
            <div className="bg-red-600 text-white text-sm font-semibold px-2 py-1 rounded w-fit mb-2">
              {product.discount}
            </div>

          <Link href={`/product/${product.name}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-52 object-contain rounded-xl transition-transform duration-300 hover:scale-105"
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
                <span className="text-gray-600 text-sm ml-2">
                  ({product.reviews} Reviews)
                </span>
              </p>


              <p className="text-xl font-bold text-green-700 mt-2">
                {product.price}
              </p>
              <p
                className={`mt-2 font-semibold ${
                  product.stock > 5
                    ? "text-green-600"
                    : product.stock > 0
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {product.stock > 5
                  ? "🟢 In Stock"
                  : product.stock > 0
                  ? `🟡 Only ${product.stock} Left`
                  : "🔴 Out of Stock"}
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

      toast.error("💔 Removed from Wishlist");
    } else {
      setWishlist([
        ...wishlist,
        product
      ]);

      toast.success("❤️ Added to Wishlist");
    }
  }}
  className="mb-3 w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
>
  {wishlist.find(
    (item:any)=>item.name===product.name
  )
    ? "♥ Remove from Wishlist"
    : "♡ Add to Wishlist"}
</button>

              <button
                onClick={() => addToCart(product)}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                🛒 Add to Cart
              </button>

            </div>

          ))}

        </div>

      </section>
      <section className="py-16 px-10 bg-slate-800 mt-16">

  <h2 className="text-4xl font-bold text-center text-white mb-12">
    Why Choose Vinay Electronics?
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
      <h3 className="text-5xl">🚚</h3>
      <h4 className="text-xl font-bold mt-4 text-black">
        Free Shipping
      </h4>
      <p className="text-gray-600 mt-2">
        Free delivery on all orders above $100.
      </p>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
      <h3 className="text-5xl">🔒</h3>
      <h4 className="text-xl font-bold mt-4 text-black">
        Secure Payment
      </h4>
      <p className="text-gray-600 mt-2">
        100% safe and secure online payments.
      </p>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
      <h3 className="text-5xl">↩️</h3>
      <h4 className="text-xl font-bold mt-4 text-black">Easy Returns</h4>
      <p className="text-gray-600 mt-2">
        Hassle-free return policy within 7 days.
      </p>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
      <h3 className="text-5xl">💬</h3>
      <h4 className="text-xl font-bold mt-4 text-black">24/7 Support</h4>
      <p className="text-gray-600 mt-2">
        Our support team is always ready to help.
      </p>
    </div>

  </div>

</section>
         <footer className="bg-black text-white mt-16">

  <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

    {/* Company */}
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Vinay Electronics Store
      </h2>

      <p className="text-gray-400">
        Your one-stop destination for laptops, mobiles,
        smart watches and accessories.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h2 className="text-xl font-bold mb-4">
        Quick Links
      </h2>

      <ul className="space-y-2 text-gray-400">
        <li>Home</li>
        <li>Products</li>
        <li>Wishlist</li>
        <li>Cart</li>
      </ul>
    </div>

    {/* Contact */}
    <div>
      <h2 className="text-xl font-bold mb-4">
        Contact Us
      </h2>

      <p className="text-gray-400">
        📧 support@vinayelectronics.com
      </p>

      <p className="text-gray-400 mt-2">
        📞 +1 987-654-3210
      </p>

      <p className="text-gray-400 mt-2">
        📍 Hyderabad, India
      </p>
    </div>

  </div>

  <div className="border-t border-gray-700 text-center py-5 text-gray-500">
    © 2026 Vinay Electronics Store. All Rights Reserved.
  </div>

</footer>

    </main>
  );
}