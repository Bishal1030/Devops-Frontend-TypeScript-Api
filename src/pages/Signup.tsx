import { useState } from "react";
import { signup } from "../api/auth";
import { Link } from "react-router-dom"; // ✅ import Link

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signup({ name, email, password, image });
      alert("User created successfully");
    } catch (err: any) {
      setError(err?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-10 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) setImage(e.target.files[0]);
              }}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-blue-600 text-white font-semibold text-lg
              hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-8">
          Already have an account?{" "}
          <Link
            to="/login" // ✅ this is your route for Login
            className="text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
