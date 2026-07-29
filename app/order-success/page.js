"use client";

import Link from "next/link";

export default function OrderSuccess() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-10 rounded-lg shadow-lg text-center">

        <h1 className="text-5xl mb-4">🎉</h1>

        <h2 className="text-3xl font-bold text-green-600">
          Order Placed Successfully!
        </h2>

        <p className="text-gray-700 mt-4">
          Thank you for shopping with Vinay Electronics Store.
        </p>

        <p className="text-gray-700">
          Your order will be delivered soon.
        </p>

        <Link href="/">
          <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg">
            Continue Shopping
          </button>
        </Link>

      </div>

    </main>
  );
}