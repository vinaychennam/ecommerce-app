"use client";
import Link from "next/link";

export default function Checkout() {
  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold text-black mb-8">
        Checkout
      </h1>

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl">

        <div className="mb-5">
          <label className="font-semibold">Full Name</label>

          <input
  type="text"
  placeholder="Enter your name"
  className="w-full mt-2 border p-3 rounded-lg text-black placeholder-gray-500"
/>
        </div>

        <div className="mb-5">
          <label className="font-semibold">Email</label>

          <input
  type="email"
  placeholder="Enter your email"
  className="w-full mt-2 border p-3 rounded-lg text-black placeholder-gray-500"
/>
        </div>

        <div className="mb-5">
          <label className="font-semibold">Address</label>

          <textarea
  placeholder="Enter delivery address"
  className="w-full mt-2 border p-3 rounded-lg text-black placeholder-gray-500"
></textarea>
        </div>

        <div className="mb-5">
          <label className="font-semibold">Phone Number</label>

          <input
  type="text"
  placeholder="Enter mobile number"
  className="w-full mt-2 border p-3 rounded-lg text-black placeholder-gray-500"
/>
        </div>

        <Link href="/order-success">
  <button className="w-full bg-green-600 text-white py-3 rounded-lg">
    Place Order
  </button>
</Link>

      </div>

    </main>
  );
}