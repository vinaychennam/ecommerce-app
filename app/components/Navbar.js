"use client";

import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Navbar() {

  const { cart, wishlist } = useContext(CartContext);

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold">
        Vinay Electronics Store
      </h1>

      <ul className="flex gap-6 items-center">

        <li>
          <Link href="/">
            Home
          </Link>
        </li>

        <li>
          <Link href="/wishlist">
            ❤️ ({wishlist.length})
          </Link>
        </li>

        <li>
          <Link href="/cart">
            Cart 🛒 ({cart.length})
          </Link>
        </li>

      </ul>

    </nav>
  );
}