export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-2xl">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800">
            NSV Pure Milk
          </h1>

          <p className="text-gray-600 mt-2">
            Create Your Account
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block text-gray-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter Full Name"
              className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Mobile Number
            </label>

            <input
              type="tel"
              placeholder="Enter Mobile Number"
              className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">
              Email (Optional)
            </label>

            <input
              type="email"
              placeholder="Enter Email Address"
              className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">
              House No / Street
            </label>

            <input
              type="text"
              placeholder="House No, Street"
              className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Area / Village
            </label>

            <input
              type="text"
              placeholder="Area / Village"
              className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              City
            </label>

            <input
              type="text"
              placeholder="City"
              className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Pincode
            </label>

            <input
              type="text"
              placeholder="Pincode"
              className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Landmark (Optional)
            </label>

            <input
              type="text"
              placeholder="Nearby Landmark"
              className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

        </div>

        <button
          className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white rounded-xl p-4 font-semibold transition duration-300"
        >
          Create Account
        </button>

      </div>
    </main>
  );
}