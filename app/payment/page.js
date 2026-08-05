"use client";

import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Payment() {
  const [order,setOrder] = useState(null);
  useEffect(()=>{

const savedOrder =
JSON.parse(
localStorage.getItem("currentOrder")
);

setOrder(savedOrder);

},[]);
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);
  const totalAmount = cart.reduce(
  (total, item) => {
    return (
      total +
      Number(
        item.price.replace("₹", "").replace(/,/g, "")
      ) * Number(item.quantity)
    );
  },
  0
);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handlePayment = () => {

  if (cart.length === 0) {
    toast.error("Your cart is empty!");
    return;
  }


  const currentOrder =
    JSON.parse(
      localStorage.getItem("currentOrder")
    );


  if (!currentOrder) {
    toast.error("Order details not found!");
    return;
  }


  const oldOrders =
    JSON.parse(
      localStorage.getItem("orders")
    ) || [];


  const updatedOrders = [
    ...oldOrders,
    {
      ...currentOrder,
      status: "Confirmed",
      paymentMethod,
    }
  ];


  localStorage.setItem(
    "orders",
    JSON.stringify(updatedOrders)
  );


  localStorage.removeItem("currentOrder");


  toast.success("Payment Successful! 🎉");


  setCart([]);


  setTimeout(() => {
    router.push("/order-success");
  }, 1000);

};

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">

        <h1 className="text-3xl font-bold text-center text-black mb-2">
          💳 Payment
        </h1>

        <p className="text-gray-600 text-center mb-8">
          Choose your preferred payment method
        </p>

        {/* Payment Methods */}
        <div className="space-y-4">

          {/* Card */}
          <label className="flex items-center gap-3 border-2 border-gray-300 p-4 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition text-black font-medium">
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
            />
            <span>💳 Credit / Debit Card</span>
          </label>

          {/* UPI */}
          <label className="flex items-center gap-3 border-2 border-gray-300 p-4 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition text-black font-medium">
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "upi"}
              onChange={() => setPaymentMethod("upi")}
            />
            <span>📱 UPI</span>
          </label>

          {/* COD */}
          <label className="flex items-center gap-3 border-2 border-gray-300 p-4 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition text-black font-medium">
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            <span>💵 Cash on Delivery</span>
          </label>

        </div>

        {/* Card Details */}
        {paymentMethod === "card" && (
          <div className="mt-6 space-y-4">

            <input
              type="text"
              placeholder="Card Number"
              className="w-full border border-gray-300 rounded-lg p-3 text-black placeholder-gray-500"
            />

            <input
              type="text"
              placeholder="Card Holder Name"
              className="w-full border border-gray-300 rounded-lg p-3 text-black placeholder-gray-500"
            />

            <div className="grid grid-cols-2 gap-4">

              <input
                type="text"
                placeholder="MM/YY"
                className="border border-gray-300 rounded-lg p-3 text-black placeholder-gray-500"
              />

              <input
                type="password"
                placeholder="CVV"
                className="border border-gray-300 rounded-lg p-3 text-black placeholder-gray-500"
              />

            </div>

          </div>
        )}

        {/* UPI Details */}
        {paymentMethod === "upi" && (
          <div className="mt-6">
            <input
              type="text"
              placeholder="Enter UPI ID (example@upi)"
              className="w-full border border-gray-300 rounded-lg p-3 text-black placeholder-gray-500"
            />
          </div>
        )}

        {/* COD Message */}
        {paymentMethod === "cod" && (
          <div className="mt-6 bg-yellow-100 border border-yellow-400 rounded-lg p-4">
            <p className="text-yellow-800 font-semibold">
              💵 Cash on Delivery Selected
            </p>

            <p className="text-gray-700 mt-2">
              You can pay when your order is delivered.
            </p>
          </div>
        )}
        <div className="mt-8 border-t pt-6">

  <h2 className="text-xl font-bold text-black mb-4">
    Order Summary
  </h2>

  <div className="flex justify-between text-gray-700 mb-2">
    <span>Items</span>
    <span>{cart.length}</span>
  </div>

  <div className="flex justify-between text-gray-700 mb-2">
    <span>Delivery</span>
    <span className="text-green-600 font-semibold">FREE</span>
  </div>

  <div className="border-t my-3"></div>

  <div className="flex justify-between text-2xl font-bold text-black">
    <span>Total</span>
    <span>₹{totalAmount.toLocaleString("en-IN")}</span>
  </div>

</div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Pay Now
        </button>

      </div>
    </main>
  );
}