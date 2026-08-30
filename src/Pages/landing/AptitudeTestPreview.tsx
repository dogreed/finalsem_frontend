import { Clock, CheckCircle2 } from "lucide-react";

export default function AptitudeTestPreview() {
  return (
    <section
      id="aptitude-test"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-slate-50 via-white to-blue-50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 mb-5">
            Stack-Based Assessments
          </span>

          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            Skill-Based Aptitude Testing
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Demonstrate your technical expertise through real-world assessments
            designed for modern technology stacks.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left Test Card */}
          <div className="relative">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-linear-to-br from-blue-200/30 to-cyan-200/30 blur-3xl rounded-full" />

            <div className="relative rounded-3xl bg-white border border-gray-200 shadow-2xl shadow-blue-100/40 overflow-hidden">
              {/* Top Bar */}
              <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 bg-linear-to-r from-blue-600 to-cyan-500">
                <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-semibold backdrop-blur-sm">
                  Question 5 / 20
                </span>

                <div className="flex items-center gap-2 text-white">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">12:45</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                    Routing
                  </span>

                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    React Router
                  </span>
                </div>

                {/* Question */}
                <h3 className="text-xl font-bold text-gray-900 leading-relaxed mb-7">
                  What is the correct way to implement protected routes in React
                  Router v6?
                </h3>

                {/* Options */}
                <div className="space-y-4">
                  {[
                    {
                      text: "Using ProtectedRoute component wrapper",
                      active: false,
                    },
                    {
                      text: "Using Navigate component with conditional rendering",
                      active: true,
                    },
                    {
                      text: "Using useNavigate hook in useEffect",
                      active: false,
                    },
                    {
                      text: "Using Router guards middleware",
                      active: false,
                    },
                  ].map((option, index) => (
                    <button
                      key={index}
                      className={`w-full rounded-2xl border p-4 text-left transition-all duration-300 ${
                        option.active
                          ? "border-blue-500 bg-blue-50 shadow-md"
                          : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {option.active ? (
                          <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300 shrink-0" />
                        )}

                        <span
                          className={`font-medium ${
                            option.active ? "text-blue-700" : "text-gray-700"
                          }`}
                        >
                          {option.text}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Analytics */}
          <div>
            <span className="inline-flex items-center rounded-full bg-cyan-100 px-4 py-2 text-sm font-medium text-cyan-700 mb-5">
              Performance Insights
            </span>

            <h3 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
              Topic-Wise Weighted Scoring
            </h3>

            <p className="text-gray-600 mb-10 leading-relaxed text-lg">
              Analyze your strengths and identify improvement areas with
              detailed performance breakdowns across important technical topics.
            </p>

            <div className="space-y-5">
              {[
                {
                  topic: "Routing & Navigation",
                  score: 85,
                  color: "from-green-500 to-emerald-500",
                },
                {
                  topic: "Authentication",
                  score: 90,
                  color: "from-green-500 to-emerald-500",
                },
                {
                  topic: "API Integration",
                  score: 65,
                  color: "from-yellow-500 to-orange-500",
                },
              ].map((item) => (
                <div
                  key={item.topic}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-gray-900">
                      {item.topic}
                    </span>

                    <span className="font-bold text-gray-700">
                      {item.score}%
                    </span>
                  </div>

                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-linear-to-r ${item.color}`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
