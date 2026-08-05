"use client";

import { useContext } from "react";
import Link from "next/link";
import { CartContext } from "../context/CartContext";


export default function Cart() {
  const { cart, setCart, darkMode } = useContext(CartContext);
  const totalPrice = cart.reduce((total, item) => {
  return (
    total +
    Number(
      item.price.replace("₹", "").replace(",", "")
    ) * Number(item.quantity)
  );
}, 0);

  
  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };
  const increaseQuantity = (index) => {
  const updatedCart = [...cart];

  updatedCart[index].quantity += 1;

  setCart(updatedCart);
};
const decreaseQuantity = (index) => {
  const updatedCart = [...cart];

  if (updatedCart[index].quantity > 1) {
    updatedCart[index].quantity -= 1;
    setCart(updatedCart);
  } else {
    removeItem(index);
  }
};

  return (
    <main
      className={`min-h-screen p-10 transition-colors duration-300 ${
      darkMode
      ? "bg-gray-900 text-white"
      : "bg-gray-100 text-black"
      }`}
      >

      <h1 className="text-3xl font-bold text-black mb-6">
        My Cart 🛒
      </h1>

      {cart.length === 0 ? (
        <>
          <p className="text-gray-700">
            Your cart is empty.
          </p>

          <Link href="/">
            <button className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg">
              Continue Shopping
            </button>
          </Link>
        </>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-lg shadow-lg flex items-center justify-between mb-5"
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
    {item.price}
  </p>

  <div className="flex items-center gap-3 mt-3">
    <button
  onClick={() => decreaseQuantity(index)}
  className="bg-red-500 text-white px-3 py-1 rounded"
>
  -
</button>

    <span className="font-bold text-lg">
      {item.quantity}
    </span>

    <button
  onClick={() => increaseQuantity(index)}
  className="bg-green-500 text-white px-3 py-1 rounded"
>
  +
</button>
  </div>
</div>

              </div>

              <button
                onClick={() => removeItem(index)}
                className="bg-red-600 text-white px-5 py-2 rounded-lg"
              >
                Remove
              </button>

            </div>
          ))}

          <div className="mt-8 flex justify-between items-center">

  <h2 className="text-3xl font-bold text-black">
  Total: ₹{totalPrice.toLocaleString("en-IN")}
  </h2>

  <div className="flex gap-4">

    <Link href="/">
      <button className="bg-green-600 text-white px-5 py-2 rounded-lg">
        Continue Shopping
      </button>
    </Link>

    <Link href="/checkout">
  <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
    Checkout
  </button>
</Link>

  </div>

</div>
        </>
      )}

    </main>
  );
}