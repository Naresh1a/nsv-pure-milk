export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-green-800">
            NSV Pure Milk
          </h1>

          <p className="text-gray-800 mt-2">
            Customer Login
          </p>

        </div>

        <form className="space-y-5">

          <div>

            <label className="block mb-2 font-medium">
              Mobile Number
            </label>

            <input
              type="tel"
              placeholder="Enter Mobile Number"
              className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl p-4 font-semibold transition"
          >
            Continue
          </button>

        </form>

        <p className="text-center text-gray-800 mt-6 text-sm">

          New Customer?

          <span className="text-green-600 font-semibold cursor-pointer ml-2">
            Register
          </span>

        </p>

      </div>

    </main>
  );
}