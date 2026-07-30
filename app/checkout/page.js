"use client";

import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function Checkout() {

  const router = useRouter();

  const { cart, setCart } = useContext(CartContext);


  // Calculate total price
  const totalAmount = cart.reduce(
  (total, item) => {
    return (
      total +
      Number(item.price.replace("$", "")) *
      Number(item.quantity)
    );
  },
  0
);


  // Customer details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");



  // Place Order Function
  const placeOrder = () => {


    if (cart.length === 0) {
      toast.error("Your cart is empty 🛒");
      return;
    }


    if (
      name.trim() === "" ||
      email.trim() === "" ||
      address.trim() === "" ||
      phone.trim() === ""
    ) {

      toast.error("Please fill all details ❌");
      return;

    }


    toast.success("Order placed successfully 🎉");


    // Clear cart
    setCart([]);


    // Navigate
    router.push("/order-success");

  };



  return (

    <main className="min-h-screen bg-gray-100 p-10">


      <h1 className="text-3xl font-bold text-black mb-8">
        Checkout
      </h1>



      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl">



        {/* Order Summary */}

        <div className="mb-8">


          <h2 className="text-2xl font-bold mb-4">
            Order Summary
          </h2>



          {
            cart.length === 0 ? (

              <p className="text-gray-500">
                No products in cart
              </p>

            ) : (

              cart.map((item, index) => (

                <div
                  key={index}
                  className="flex justify-between border-b py-3"
                >

                  <span className="text-black">
                    {item.name} x {item.quantity}
                  </span>


                  <span className="text-black">
                    ₹{Number(item.price) * Number(item.quantity)}
                  </span>


                </div>

              ))

            )
          }





          <div className="flex justify-between mt-5 text-xl font-bold">

            <span>
              Total
            </span>


            <span>
              ₹{totalAmount}
            </span>

          </div>


        </div>





        {/* Name */}

        <div className="mb-5">

          <label className="font-semibold">
            Full Name
          </label>


          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-2 border p-3 rounded-lg text-black placeholder-gray-500"
          />

        </div>





        {/* Email */}

        <div className="mb-5">

          <label className="font-semibold">
            Email
          </label>


          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 border p-3 rounded-lg text-black placeholder-gray-500"
          />

        </div>





        {/* Address */}

        <div className="mb-5">

          <label className="font-semibold">
            Address
          </label>


          <textarea
            placeholder="Enter delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full mt-2 border p-3 rounded-lg text-black placeholder-gray-500"
          />


        </div>





        {/* Phone */}

        <div className="mb-5">

          <label className="font-semibold">
            Phone Number
          </label>


          <input
            type="text"
            placeholder="Enter mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full mt-2 border p-3 rounded-lg text-black placeholder-gray-500"
          />


        </div>





        <button
          onClick={placeOrder}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
        >
          Place Order
        </button>



      </div>



    </main>

  );
}