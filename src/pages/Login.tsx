import { useState } from "react";
import { login } from "../api/auth"; // Your login API function
import Cookies from "js-cookie"; // To store token in cookie

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await login({ email, password });
      // Save token in cookie for 7 days
      Cookies.set("token", res.token, { expires: 7 });
      alert("Logged in successfully");
      // Optionally redirect to dashboard
      // window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-10 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-8">
          Don't have an account?{" "}
          <span className="text-blue-600 hover:underline cursor-pointer">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
