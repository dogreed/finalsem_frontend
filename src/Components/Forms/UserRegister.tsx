import { useState, type ChangeEvent, type FormEvent } from "react";
import { Mail, Lock, User, Eye, EyeOff, UserPlus } from "lucide-react";
import { useToast } from "../../hooks/useToasts";
import { registerUser } from "../../api/auth/authapi";
import { useNavigate } from "react-router-dom";

type StudentForm = {
  fullName: string;
  email: string;
  password: string;
};

export default function UserRegister() {
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState<StudentForm>({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.fullName || !form.email || !form.password) {
      showError("Please fill in all required fields");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await registerUser(form);

      // const accessToken = res?.data?.accessToken;

      // if (accessToken) {
      //   localStorage.setItem("accessTokenU", accessToken);
      // }

      showSuccess(res?.message || "User account created successfully");

      navigate("/login");

      setForm({
        fullName: "",
        email: "",
        password: "",
      });
    } catch (error: any) {
      console.error("Register error:", error?.response?.data || error.message);

      showError(
        error?.response?.data?.message ||
          error?.response?.data?.errors?.[0] ||
          "Error occurred while creating account",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder:text-gray-400 transition";

  const passwordInputClass =
    "w-full pl-10 pr-12 py-2.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder:text-gray-400 transition";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Full Name <span className="text-red-500">*</span>
        </label>

        <div className="relative">
          <User
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />

          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            className={inputClass}
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Email Address <span className="text-red-500">*</span>
        </label>

        <div className="relative">
          <Mail
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />

          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            className={inputClass}
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Password <span className="text-red-500">*</span>
        </label>

        <div className="relative">
          <Lock
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Create a strong password"
            className={passwordInputClass}
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-3xl transition-all shadow-lg shadow-blue-500/30 text-base mt-2"
      >
        <UserPlus size={22} />

        {isSubmitting ? "Creating Account..." : "Create User Account"}
      </button>
    </form>
  );
}
