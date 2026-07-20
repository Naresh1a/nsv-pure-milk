export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-green-700">
          🥛 NSV Pure Milk
        </h1>

        <nav className="flex gap-6">
          <a href="#">Home</a>
          <a href="#">Products</a>
          <a href="#">Subscription</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>

        <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
          Login
        </button>
      </div>
    </header>
  );
}