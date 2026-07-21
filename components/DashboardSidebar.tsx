export default function DashboardSidebar() {
  return (
    <aside className="w-72 bg-green-700 text-white min-h-screen p-6">

      <h1 className="text-3xl font-bold mb-10">
        🥛 NSV Pure Milk
      </h1>

      <nav className="space-y-4">

        <button className="w-full text-left p-3 rounded-xl hover:bg-green-600">
          🏠 Dashboard
        </button>

        <button className="w-full text-left p-3 rounded-xl hover:bg-green-600">
          🥛 Today's Delivery
        </button>

        <button className="w-full text-left p-3 rounded-xl hover:bg-green-600">
          📅 Subscription
        </button>

        <button className="w-full text-left p-3 rounded-xl hover:bg-green-600">
          💳 Payments
        </button>

        <button className="w-full text-left p-3 rounded-xl hover:bg-green-600">
          📜 Order History
        </button>

        <button className="w-full text-left p-3 rounded-xl hover:bg-green-600">
          📍 Address
        </button>

        <button className="w-full text-left p-3 rounded-xl hover:bg-green-600">
          🔔 Notifications
        </button>

        <button className="w-full text-left p-3 rounded-xl hover:bg-green-600">
          ⚙️ Settings
        </button>

        <button className="w-full text-left p-3 rounded-xl hover:bg-red-600 mt-8">
          🚪 Logout
        </button>

      </nav>

    </aside>
  );
}