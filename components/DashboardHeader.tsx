export default function DashboardHeader() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-green-800">
          Welcome 👋
        </h1>

        <p className="text-gray-900 mt-2">
          Good Morning, Naresh
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-2xl">🔔</button>
        <button className="text-2xl">📞</button>

        <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
          N
        </div>
      </div>
    </div>
  );
}