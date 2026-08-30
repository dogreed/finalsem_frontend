import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-blue-600 via-blue-700 to-cyan-600">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Boost Your Career?
        </h2>
        <p className="text-xl text-blue-100 mb-8 leading-relaxed">
          Join thousands of developers who have found their dream jobs with our
          AI-powered platform
        </p>
        <button
          className="px-10 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all cursor-pointer"
          onClick={() => navigate("register")}
        >
          Create Free Account
        </button>
        <p className="text-blue-200 mt-4 text-sm">
          No credit card required • Free forever
        </p>
      </div>
    </section>
  );
}
