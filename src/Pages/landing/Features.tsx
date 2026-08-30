import {
  Target,
  ClipboardCheck,
  TrendingUp,
  Shield,
  BarChart3,
  Briefcase,
  Sparkles,
  Users,
  Rocket,
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Smart Job Matching",
    description:
      "Precise match percentages based on your skills and experience.",
  },
  {
    icon: ClipboardCheck,
    title: "Stack-Based Aptitude Tests",
    description:
      "Specialized assessments for MERN, Django, Spring, Flutter and more.",
  },
  {
    icon: TrendingUp,
    title: "Weak Area Analysis",
    description: "Topic-wise breakdown to improve where it matters most.",
  },
  {
    icon: Shield,
    title: "Skill Gap Detection",
    description: "Know missing requirements before applying confidently.",
  },
  {
    icon: BarChart3,
    title: "Performance Dashboard",
    description: "Track your improvement journey with visual analytics.",
  },
  {
    icon: Briefcase,
    title: "Real Job Insights",
    description: "See what companies are actively looking for.",
  },
  {
    icon: Sparkles,
    title: "Personalized Recommendations",
    description: "Custom learning paths built around your results.",
  },
  {
    icon: Users,
    title: "Peer Comparison",
    description: "Compare your performance with others in your stack.",
  },
  {
    icon: Rocket,
    title: "Career Growth Roadmap",
    description: "Step-by-step guidance toward your dream role.",
  },
];

export default function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
            Built to Accelerate Your Career
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Powerful tools to analyze your skills, identify gaps, and discover
            opportunities that align with your goals.
          </p>
        </div>

        {/* Compact Modern Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Top Glow */}
                <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-blue-600 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                {/* Icon */}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 transition-colors duration-300 group-hover:bg-blue-100">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
