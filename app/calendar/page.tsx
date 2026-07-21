export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold text-green-800">
        📅 Pause / Resume Delivery
      </h1>

      <p className="text-gray-900 mt-2">
        Select the dates when you don't need milk delivery.
      </p>

      <div className="mt-10 bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-2xl font-semibold mb-6">
          July 2026
        </h2>

        <div className="grid grid-cols-7 gap-4">

          {Array.from({ length: 31 }).map((_, index) => (

            <button
              key={index}
              className="h-14 rounded-xl border hover:bg-green-600 hover:text-white transition"
            >
              {index + 1}
            </button>

          ))}

        </div>

      </div>

    </div>
  );
}