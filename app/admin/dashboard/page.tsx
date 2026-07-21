"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminDashboardPage() {
  const router = useRouter();

  const cards = [
    {
      title: "Customers",
      value: "125",
      icon: "👥",
      color: "bg-blue-100",
    },
    {
      title: "Orders",
      value: "42",
      icon: "📦",
      color: "bg-yellow-100",
    },
    {
      title: "Revenue",
      value: "₹28,500",
      icon: "💰",
      color: "bg-green-100",
    },
    {
      title: "Subscriptions",
      value: "96",
      icon: "🥛",
      color: "bg-pink-100",
    },
  ];

  const menus = [
    { title: "Customers", icon: "👥", path: "/admin/customers" },
    { title: "Products", icon: "🥛", path: "/admin/products" },
    { title: "Orders", icon: "📦", path: "/admin/orders" },
    { title: "Invoices", icon: "🧾", path: "/admin/invoices" },
    { title: "Payments", icon: "💳", path: "/admin/payments" },
    { title: "Delivery Areas", icon: "📍", path: "/admin/delivery-areas" },
    { title: "Settings", icon: "⚙️", path: "/admin/settings" },
  ];

  return (
    <main className="min-h-screen bg-gray-100">

      <header className="bg-green-700 px-6 py-5 text-white shadow">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold">
              NSV Pure Milk Admin
            </h1>

            <p className="text-green-100">
              Dairy Management Dashboard
            </p>
          </div>

          <button
            onClick={() => router.push("/admin/login")}
            className="rounded-lg bg-white px-4 py-2 font-semibold text-green-700"
          >
            Logout
          </button>

        </div>

      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">

        <div className="rounded-2xl bg-white p-6 shadow">

          <h2 className="mb-4 text-xl font-bold">
            Search Customer
          </h2>

          <input
            type="text"
            placeholder="Search by Mobile Number..."
            className="w-full rounded-xl border p-4 outline-none focus:border-green-600"
          />

        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {cards.map((card) => (
            <motion.div
              whileHover={{ scale: 1.03 }}
              key={card.title}
              className="rounded-2xl bg-white p-6 shadow"
            >
              <div className={`flex h-16 w-16 items-center justify-center rounded-full ${card.color} text-3xl`}>
                {card.icon}
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                {card.title}
              </h3>

              <p className="mt-2 text-3xl font-bold text-green-700">
                {card.value}
              </p>

            </motion.div>
          ))}

        </div>

        <div className="mt-10 rounded-2xl bg-white p-6 shadow">

          <h2 className="mb-6 text-2xl font-bold">
            Management
          </h2>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {menus.map((menu) => (
              <button
                key={menu.title}
                onClick={() => router.push(menu.path)}
                className="rounded-xl border p-5 text-left transition hover:border-green-600 hover:bg-green-50"
              >
                <div className="text-3xl">
                  {menu.icon}
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                  {menu.title}
                </h3>

              </button>
            ))}

          </div>

        </div>

      </div>

    </main>
  );
}