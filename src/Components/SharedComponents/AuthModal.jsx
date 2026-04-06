// src/Components/AuthModal.jsx
import { useState } from "react";
import { useAuth } from "../../Utils/AuthContext";
import toast from "react-hot-toast";

export default function AuthModal({ onClose }) {
  const { login, register } = useAuth();

  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const required =
      mode === "login"
        ? [formData.email, formData.password]
        : [
            formData.firstName,
            formData.lastName,
            formData.email,
            formData.password,
          ];
    if (required.some((v) => !v.trim()))
      return setError("All fields are required");

    try {
      setLoading(true);
      setError("");
      if (mode === "login") {
        await login({ email: formData.email, password: formData.password });
        toast.success("Login successful");
      } else {
        await register(formData);
        // Auto-login after successful registration
        await login({ email: formData.email, password: formData.password });
        toast.success("Registration successful");
      }
      onClose?.();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };
  // Consistent camelCase throughout AuthModal

  // Fix switchMode reset
  const switchMode = (m) => {
    setMode(m);
    setError("");
    setFormData({ firstName: "", lastName: "", email: "", password: "" }); // ✅
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-9">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-red-600 hover:bg-red-800 text-white flex items-center justify-center text-base leading-none transition-colors"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Logo */}
        <div className="mb-6">
          <img src="main/logo2.png" alt="" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-[#00569e] mb-1">
          {mode === "login" ? "Login" : "Create Account"}
        </h2>
        <p className="text-sm text-gray-500 mb-5 leading-relaxed">
          {mode === "login" ? (
            <>
              If you are having trouble accessing your account, click{" "}
              <strong className="text-gray-800">Forgot Password</strong> below.
            </>
          ) : (
            "Fill in your details to create a new account."
          )}
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2.5 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-2.5">
          {mode === "register" && (
            <div className="grid grid-cols-2 gap-2.5">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
                  👤
                </span>
                <input
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-[#00569e] focus:outline-none transition-colors placeholder-gray-300 text-gray-700"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
                  👤
                </span>
                <input
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-[#00569e] focus:outline-none transition-colors placeholder-gray-300 text-gray-700"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                />
              </div>
            </div>
          )}

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
              ✉
            </span>
            <input
              className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-[#00569e] focus:outline-none transition-colors placeholder-gray-300 text-gray-700"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="eg. example@domain.com"
            />
          </div>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
              🔑
            </span>
            <input
              className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-[#00569e] focus:outline-none transition-colors placeholder-gray-300 text-gray-700"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-1 py-3 bg-red-600 hover:bg-red-800 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading && (
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
            )}
            {loading
              ? mode === "login"
                ? "Logging in..."
                : "Creating account..."
              : mode === "login"
                ? "लगइन"
                : "Sign Up"}
          </button>
        </form>

        {mode === "login" && (
          <span className="inline-block mt-3 text-xs text-gray-400 hover:text-[#00569e] cursor-pointer transition-colors">
            Forgot Password?
          </span>
        )}

        <p className="mt-4 text-sm text-gray-500">
          {mode === "login" ? (
            <>
              तपाईंको खाता छैन ?{" "}
              <button
                onClick={() => switchMode("register")}
                className="text-[#00569e] font-semibold hover:underline"
              >
                साइन अप
              </button>{" "}
              गर्नुहोस् ।
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => switchMode("login")}
                className="text-[#00569e] font-semibold hover:underline"
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
