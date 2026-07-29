"use client";

import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useParams } from "next/navigation";
import { products } from "../../data/products";

export default function ProductDetails() {
  const params = useParams();
  const { cart, setCart } = useContext(CartContext);

  const product = products.find(
  (item) => item.name === decodeURIComponent(params.name)
);
const addToCart = (product) => {
  const existingProduct = cart.find(
    (item) => item.name === product.name
  );

  if (existingProduct) {
    const updatedCart = cart.map((item) =>
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

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-black">
          {decodeURIComponent(params.name)}
        </h1>

        <img
        src={product.image}
        alt={product.name}
        className="w-80 rounded-lg mt-6"
        />
        <p className="text-2xl font-bold text-green-600 mt-6">
           {product.price}
        </p>
        <p className="text-gray-700 mt-3">
        {product.description}
        </p>

        <p className="text-yellow-500 text-xl mt-3">
        {product.rating}
        </p>

        <p className="bg-red-600 text-white inline-block px-3 py-1 rounded mt-3">
        {product.discount}
        </p>
    <button
        onClick={() => addToCart(product)}
        className="mt-6 w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
    >
        Add to Cart
    </button>
      </div>
    </main>
  );
}