"use client";

import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        wishlist,
        setWishlist,
        darkMode,
      setDarkMode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}