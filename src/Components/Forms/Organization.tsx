import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  Building2,
  Globe,
} from "lucide-react";
import { useToast } from "../../hooks/useToasts";
import { registerOrganization } from "../../api/auth/authapi";
import { useNavigate } from "react-router-dom";

type OrganizationForm = {
  organizationName: string;
  email: string;
  password: string;
  confirmPassword: string;
  websiteUrl: string;
};

export default function Organization() {
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState<OrganizationForm>({
    organizationName: "",
    email: "",
    password: "",
    confirmPassword: "",
    websiteUrl: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !form.organizationName ||
      !form.email ||
      !form.password ||
      !form.confirmPassword ||
      !form.websiteUrl
    ) {
      showError("Please fill in all required fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      showError("Passwords do not match");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        organizationName: form.organizationName,
        email: form.email,
        password: form.password,
        websiteUrl: form.websiteUrl,
      };

      const res = await registerOrganization(payload);

      console.log("Organization Register Response:", res);

      showSuccess(
        res?.data ||
          "Organization account created successfully wait for the verification from the admins",
      );

      setTimeout(() => {
        navigate("/");
      }, 1000);

      setForm({
        organizationName: "",
        email: "",
        password: "",
        confirmPassword: "",
        websiteUrl: "",
      });
    } catch (error: any) {
      console.error(
        "Organization register error:",
        error?.response?.data || error.message,
      );

      showError(
        error?.response?.data?.message ||
          error?.response?.data?.errors?.[0] ||
          "Error occurred while creating organization account",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full pl-10 pr-3 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder:text-gray-400 transition";

  const passwordInputClass =
    "w-full pl-10 pr-12 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder:text-gray-400 transition";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Organization Name <span className="text-red-500">*</span>
        </label>

        <div className="relative">
          <Building2
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />

          <input
            type="text"
            name="organizationName"
            placeholder="Enter organization name"
            className={inputClass}
            value={form.organizationName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Organization Email <span className="text-red-500">*</span>
        </label>

        <div className="relative">
          <Mail
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />

          <input
            type="email"
            name="email"
            placeholder="hello@company.com"
            className={inputClass}
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Website URL <span className="text-red-500">*</span>
        </label>

        <div className="relative">
          <Globe
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />

          <input
            type="url"
            name="websiteUrl"
            placeholder="https://yourcompany.com"
            className={inputClass}
            value={form.websiteUrl}
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Confirm Password <span className="text-red-500">*</span>
        </label>

        <div className="relative">
          <Lock
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />

          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm your password"
            className={passwordInputClass}
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-3xl transition-all shadow-lg shadow-blue-500/30 text-base"
      >
        <UserPlus size={22} />

        {isSubmitting ? "Creating Account..." : "Create Organization Account"}
      </button>
    </form>
  );
}
