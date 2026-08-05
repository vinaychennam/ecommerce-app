"use client";

import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "../context/CartContext";

export default function Orders() {
  const router = useRouter();

  const [orders, setOrders] = useState([]);

  const { darkMode } = useContext(CartContext);


  useEffect(() => {

  const loggedInUser =
    localStorage.getItem("loggedInUser");

  // User is not logged in
  if (!loggedInUser) {
    router.push("/login");
    return;
  }

  const user = JSON.parse(loggedInUser);

  const savedOrders =
    JSON.parse(
      localStorage.getItem("orders")
    ) || [];

  // Show only this user's orders
  const userOrders = savedOrders.filter(
    (order) =>
      order.customer?.email === user.email
  );

  setOrders(userOrders);

}, [router]);



  return (

    <main
      className={`min-h-screen p-10 transition ${
        darkMode
        ? "bg-gray-900 text-white"
        : "bg-gray-100 text-black"
      }`}
    >


      <h1 className="text-4xl font-bold mb-8">
        📦 My Orders
      </h1>



      {
        orders.length === 0 ? (

          <div className="text-center mt-20">

            <h2 className="text-2xl font-bold">
              No Orders Found
            </h2>

            <p className="mt-3">
              Start shopping to see your orders here.
            </p>

          </div>


        ) : (


        <div className="grid gap-8">


        {
          orders.map((order,index)=>(


          <div
            key={index}
            className={`rounded-xl shadow-lg p-6 ${
              darkMode
              ? "bg-gray-800"
              : "bg-white"
            }`}
          >


            <div className="flex justify-between items-center">


              <h2 className="text-xl font-bold">
                Order ID:
                <span className="ml-2">
                  {order.orderId}
                </span>
              </h2>



              <span className="bg-green-500 text-white px-4 py-1 rounded-full">
                {order.status}
              </span>


            </div>



            <p className="mt-3">
              📅 Date: {order.date}
            </p>


            <p className="mt-2">
              👤 Customer:
              <span className="font-semibold ml-2">
                {order.customer?.name}
              </span>
            </p>



            <p className="mt-2">
              💳 Payment:
              <span className="font-semibold ml-2">
                {order.paymentMethod}
              </span>
            </p>




            <h3 className="text-xl font-bold mt-6 mb-3">
              Products
            </h3>



            {
              order.products.map((item,i)=>(


              <div
                key={i}
                className="flex justify-between border-b py-3"
              >


                <span>
                  {item.name}
                  {" x "}
                  {item.quantity}
                </span>


                <span>
                  {item.price}
                </span>


              </div>


              ))
            }



            <div className="flex justify-between mt-5 text-2xl font-bold">

              <span>
                Total
              </span>


              <span>
                ₹{order.totalAmount}
              </span>


            </div>



          </div>


          ))
        }


        </div>

        )

      }


    </main>

  );

}