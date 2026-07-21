import DashboardSidebar from "../../components/DashboardSidebar";
import DashboardHeader from "../../components/DashboardHeader";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashboardSidebar />

      <main className="flex-1 p-8">

        <DashboardHeader />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-gray-800 font-semibold">
              🥛 Today's Delivery
            </h2>

            <p className="text-3xl font-bold mt-3">
              1 Litre
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-gray-800 font-semibold">
              ✅ Subscription
            </h2>

            <p className="text-3xl font-bold mt-3 text-green-600">
              Active
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-gray-800 font-semibold">
              🚚 Next Delivery
            </h2>

            <p className="text-3xl font-bold mt-3">
              6:30 AM
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-gray-800 font-semibold">
              💰 Wallet
            </h2>

            <p className="text-3xl font-bold mt-3">
              ₹0
            </p>
          </div>

        </div>

      </main>
    </div>
  );
}