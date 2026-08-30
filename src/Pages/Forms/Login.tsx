// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
// import { useToast } from "../../hooks/useToasts";
// import { login } from "../../api/auth/authapi";

// export default function Login() {
//   const navigate = useNavigate();
//   const { showError, showSuccess } = useToast();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!email || !password) {
//       console.log("Missing fields");
//       return;
//     }

//     try {
//       const res = await login({ email, password });

//       const accessToken = res?.data?.accessToken;
//       const user = res?.data?.user;
//       const role = user?.role;
//       console.log(role);

//       if (accessToken) {
//         localStorage.setItem("accessTokenA", accessToken);
//       }

//       if (user) {
//         localStorage.setItem("user", JSON.stringify(user));
//       }

//       if (role === "Admin") {
//         navigate("/admin");
//         showSuccess("Login successful");
//       } else if (role === "Student") {
//         navigate("/user");
//         showSuccess("Login successful");
//       } else if (role === "Organization") {
//         navigate("/organization");
//         showSuccess("Login successful");
//       } else if (!role) {
//         showError("No role found");
//         navigate("/");
//       } else {
//         showError("Invalid role");
//         navigate("/");
//       }
//     } catch (error: any) {
//       console.error("Login error:", error?.response?.data.message);
//       showError(error?.response?.data?.message || "Error occurred while login");
//     }
//   };
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
//       <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-blue-100">
//         {/* Title */}
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-blue-600">Welcome Back</h2>
//           <p className="text-gray-500 text-sm mt-2">Login to your account</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Email */}
//           <div>
//             <label className="text-sm text-gray-600 font-medium">
//               Email Address
//             </label>

//             <div className="relative mt-2">
//               <Mail className="absolute left-3 top-3 text-gray-400" size={18} />

//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//           </div>
//           {/* Password */}
//           <div>
//             <label className="text-sm text-gray-600 font-medium">
//               Password
//             </label>

//             <div className="relative mt-2">
//               <Lock className="absolute left-3 top-3 text-gray-400" size={18} />

//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter password"
//                 className="w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />

//               <button
//                 type="button"
//                 className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>
//           </div>
//           {/* Options */}
//           <div className="flex items-center justify-between text-sm">
//             <label className="flex items-center gap-2 text-gray-600">
//               <input type="checkbox" className="accent-blue-600" />
//               Remember me
//             </label>

//             <span className="text-blue-600 cursor-pointer hover:underline">
//               Forgot password?
//             </span>
//           </div>
//           {/* Button */}
//           <button
//             type="submit"
//             className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm"
//           >
//             <LogIn size={18} />
//             Login
//           </button>
//         </form>

//         {/* Register */}
//         <p className="text-sm text-center text-gray-500 mt-6">
//           Don't have an account?{" "}
//           <span
//             className="text-blue-600 cursor-pointer hover:underline font-medium"
//             onClick={() => navigate("/register")}
//           >
//             Create Account
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn, Loader2 } from "lucide-react";
import { useToast } from "../../hooks/useToasts";
import { login } from "../../api/auth/authapi";

export default function Login() {
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      showError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await login({ email, password });
      const accessToken = res?.accessToken;
      const user = res?.user;
      const role = user?.role;

      showSuccess("Login successful");

      if (role === "Admin") {
        if (accessToken) {
          localStorage.setItem("accessTokenA", accessToken);
        }

        if (user) {
          localStorage.setItem("userA", JSON.stringify(user));
        }

        navigate("/admin");
      } else if (role === "Student") {
        if (accessToken) {
          localStorage.setItem("accessTokenS", accessToken);
        }

        if (user) {
          localStorage.setItem("userS", JSON.stringify(user));
        }

        navigate("/user");
      } else if (role === "Organization") {
        if (accessToken) {
          localStorage.setItem("accessTokenO", accessToken);
        }

        if (user) {
          localStorage.setItem("userO", JSON.stringify(user));
        }

        navigate("/organization");
      } else if (!role) {
        showError("No role found");
        navigate("/");
      } else {
        showError("Invalid role");
        navigate("/");
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.title ||
        error?.response?.data?.message ||
        "Error occurred while login";

      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-white/60 bg-white/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(37,99,235,0.15)] p-8 sm:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
              <LogIn size={24} />
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome back
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Sign in to continue to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>

                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-11 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />

                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* <div className="flex items-center justify-between text-sm">
              <label className="flex cursor-pointer items-center gap-2 text-gray-600">
                <input type="checkbox" className="h-4 w-4 accent-blue-600" />
                Remember me
              </label>
            </div> */}

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Login
                </>
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>

              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs uppercase tracking-[0.2em] text-gray-400">
                  Account
                </span>
              </div>
            </div>

            <p className="text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
