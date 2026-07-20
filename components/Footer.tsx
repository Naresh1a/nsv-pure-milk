export default function Footer() {
  return (
    <footer className="bg-green-900 text-white mt-24">

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

        {/* Brand */}

        <div>
          <h2 className="text-3xl font-bold">
            NSV Pure Milk
          </h2>

          <p className="mt-5 text-green-100 leading-7">
            Farm Fresh Milk delivered every morning.
            Naturally fresh, rapidly chilled and delivered with care.
          </p>
        </div>

        {/* Quick Links */}

        <div>
          <h3 className="font-bold text-xl mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3 text-green-100">
            <li>Home</li>
            <li>Products</li>
            <li>Subscription</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Contact */}

        <div>
          <h3 className="font-bold text-xl mb-5">
            Contact
          </h3>

          <ul className="space-y-3 text-green-100">
            <li>📞 +91 XXXXX XXXXX</li>
            <li>📧 info@nsvpuremilk.com</li>
            <li>📍 Andhra Pradesh</li>
          </ul>
        </div>

        {/* Delivery */}

        <div>
          <h3 className="font-bold text-xl mb-5">
            Delivery
          </h3>

          <ul className="space-y-3 text-green-100">
            <li>🚚 Daily Morning Delivery</li>
            <li>❄️ Chilled at 4°C</li>
            <li>🥛 Farm Fresh Milk</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-green-800 py-6 text-center text-green-200">

        © 2026 NSV Pure Milk.
        All Rights Reserved.

      </div>

    </footer>
  );
}