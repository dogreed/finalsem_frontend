import { useNavigate } from "react-router-dom";
import TalentMap from "../../assets/talentmap.png";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/20 bg-blue-50/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img
              src={TalentMap}
              alt="TalentMap Logo"
              className="h-11 w-auto object-contain"
            />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#aptitude-test"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Aptitude Test
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-2 bg-linear-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
