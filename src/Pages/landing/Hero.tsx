import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-20 lg:pb-24 text-center">
        {/* Small Badge */}
        <div className="inline-block mb-6 px-4 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
          🚀 Smart Career Guidance Platform
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Discover Careers That{" "}
          <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Truly Match Your Skills
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-gray-600 mb-6 leading-relaxed max-w-2xl mx-auto">
          Explore career opportunities based on your strengths, interests, and
          abilities. Get personalized recommendations to help you choose the
          right path for your future.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="group px-8 py-4 bg-linear-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => navigate("register")}
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button
            className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-300 cursor-pointer"
            onClick={() => navigate("register")}
          >
            Take Free Aptitude Test
          </button>
        </div>

        {/* Trust Line */}
        <p className="mt-8 text-sm text-gray-400">
          Helping students and freshers make confident career decisions.
        </p>
      </div>
    </section>
  );
}
