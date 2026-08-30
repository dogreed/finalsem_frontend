import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Building2 } from "lucide-react";
import UserRegister from "../../Components/Forms/UserRegister";
import Organization from "../../Components/Forms/Organization";

type RegisterType = "User" | "organization";

export default function Register() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<RegisterType | null>(null);

  const handleRoleSelect = (role: RegisterType) => {
    setSelectedRole(role);
  };

  // const handleBackToRole = () => {
  //   setSelectedRole(null);
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-50 px-4 py-12">
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-3xl p-8 md:p-10 border border-blue-100">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          {/* {selectedRole ? (
            <button
              type="button"
              onClick={handleBackToRole}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors px-4 py-2 rounded-2xl hover:bg-blue-50"
            >
              <ArrowLeft size={20} />
              Back
            </button>
          ) : (
            <div className="h-10 w-10" />
          )} */}

          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {selectedRole
                ? `Register as ${selectedRole === "User" ? "User" : "Organization"}`
                : "Choose your role"}
            </h1>
            <p className="text-gray-500 mt-2 text-base">
              {selectedRole
                ? "Complete your details below"
                : "Tell us who you are to get the right experience"}
            </p>
          </div>

          <div className="h-10 w-10" />
        </div>

        {/* Role Selection Screen - NOW IN SINGLE COLUMN */}
        {/* Role Selection Screen - Single Column + Smaller Cards */}
        {!selectedRole ? (
          <div className="grid grid-cols-1 gap-6">
            {/* User Card - Smaller */}
            <div
              onClick={() => handleRoleSelect("User")}
              className="group cursor-pointer border-2 border-gray-200 hover:border-blue-300 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl flex flex-col hover:scale-[1.02]"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <User size={32} className="text-blue-600" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  User
                </h3>
                <p className="text-gray-600 text-[15px] leading-relaxed">
                  Join as a User to discover internships, jobs, mentorships, and
                  connect with top organizations.
                </p>
              </div>
              <div className="mt-auto pt-6">
                <div className="w-full py-2.5 text-center text-blue-600 font-semibold bg-white border border-blue-200 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                  Continue as User →
                </div>
              </div>
            </div>

            {/* Organization Card - Smaller */}
            <div
              onClick={() => handleRoleSelect("organization")}
              className="group cursor-pointer border-2 border-gray-200 hover:border-blue-300 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl flex flex-col hover:scale-[1.02]"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-amber-100 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Building2 size={32} className="text-amber-600" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Organization
                </h3>
                <p className="text-gray-600 text-[15px] leading-relaxed">
                  Register your company to post jobs, find talented Users, and
                  build meaningful connections.
                </p>
              </div>
              <div className="mt-auto pt-6">
                <div className="w-full py-2.5 text-center text-blue-600 font-semibold bg-white border border-blue-200 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                  Continue as Organization →
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <>{selectedRole === "User" ? <UserRegister /> : <Organization />}</>
        )}

        {/* Footer - Always visible */}
        <p className="text-center text-gray-500 text-sm mt-8">
          Already have an account?{" "}
          <span
            className="text-blue-600 font-semibold hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
