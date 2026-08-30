import { UserPlus, FileText, Trophy } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Profile & Upload Resume",
    description:
      "Sign up in seconds and upload your resume. Our algorithms extracts your skills automatically.",
  },
  {
    icon: FileText,
    step: "02",
    title: "Take Stack-based Aptitude Test",
    description:
      "Choose your technology stack and take a comprehensive test. Get scored on topic-wise performance.",
  },
  {
    icon: Trophy,
    step: "03",
    title: "Get Ranked &  Recommended to Companies",
    description:
      "Get ranked for job postings based on your aptitude test results, resume strength, and overall profile performance.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>

          <p className="text-lg text-gray-600">
            Get started in three simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.step} className="relative">
                {/* Card */}
                <div
                  className="group h-full rounded-2xl border border-gray-200 bg-white p-7
                  shadow-sm transition-all duration-300
                  hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between mb-6">
                    {/* Icon */}
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-xl
                      bg-linear-to-br from-blue-600 to-cyan-500 shadow-md"
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Step Number */}
                    <span className="text-4xl font-bold text-gray-400 group-hover:text-blue-100 transition-colors duration-300">
                      {step.step}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-snug">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-linear-to-r from-blue-500 to-cyan-400" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
