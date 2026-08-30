import {
  Award,
  TrendingUp,
  TrendingDown,
  BookOpen,
  RotateCcw,
  ExternalLink,
  Target,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

export default function TestResult() {
  const navigate = useNavigate();

  const { state } = useLocation();

  if (!state) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">No Test Data Found</h2>

        <button
          onClick={() => navigate("/user/aptitude-test")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          Take Test
        </button>
      </div>
    );
  }

  const {
    score,
    totalAnswered,
    correctAnswers,
    chapterScores,
    weakChapters,
    recommendedResources,
  } = state;

  const incorrectAnswers = totalAnswered - correctAnswers;

  const strongChapters = chapterScores.filter(
    (chapter: any) => !chapter.isWeak,
  );

  const weakChapterResults = chapterScores.filter(
    (chapter: any) => chapter.isWeak,
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-linear-to-br from-blue-600 to-cyan-500 rounded-full mb-4 shadow-lg">
            <Award className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Test Completed!
          </h1>

          <p className="text-lg text-gray-600">
            Here&apos;s your detailed performance analysis
          </p>
        </div>

        {/* Overall Score */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm mb-6">
          <div className="text-center mb-8">
            <p className="text-gray-500 text-lg mb-2">Overall Score</p>

            <div className="text-7xl font-black bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              {score}%
            </div>

            <p className="text-gray-600 mt-3">
              {score >= 80
                ? "Excellent performance!"
                : score >= 60
                  ? "Good effort!"
                  : "Keep practicing and improving!"}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="rounded-xl border border-green-200 bg-green-50 p-5 text-center">
              <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />

              <div className="text-4xl font-bold text-green-700">
                {correctAnswers}
              </div>

              <div className="text-sm text-green-700 mt-1">Correct Answers</div>
            </div>

            <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-center">
              <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />

              <div className="text-4xl font-bold text-red-700">
                {incorrectAnswers}
              </div>

              <div className="text-sm text-red-700 mt-1">Incorrect Answers</div>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 text-center">
              <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />

              <div className="text-4xl font-bold text-blue-700">
                {totalAnswered}
              </div>

              <div className="text-sm text-blue-700 mt-1">Total Answered</div>
            </div>
          </div>
        </div>

        {/* Topic Breakdown */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Chapter-wise Breakdown
            </h2>

            <div className="space-y-5">
              {chapterScores.map((chapter: any) => (
                <div key={chapter.chapterId}>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {chapter.chapterName}
                      </p>

                      <p className="text-sm text-gray-500">
                        {chapter.stackName}
                      </p>
                    </div>

                    <span className="font-bold text-gray-800">
                      {chapter.scorePercent}%
                    </span>
                  </div>

                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        chapter.scorePercent >= 80
                          ? "bg-linear-to-r from-green-500 to-emerald-500"
                          : chapter.scorePercent >= 50
                            ? "bg-linear-to-r from-blue-500 to-cyan-500"
                            : "bg-linear-to-r from-orange-500 to-red-500"
                      }`}
                      style={{
                        width: `${chapter.scorePercent}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strength & Weakness */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-green-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <TrendingUp className="w-6 h-6 text-green-600" />

                <h2 className="text-2xl font-bold text-gray-900">Strengths</h2>
              </div>

              {strongChapters.length > 0 ? (
                strongChapters.map((chapter: any) => (
                  <div
                    key={chapter.chapterId}
                    className="flex items-center justify-between p-4 rounded-xl bg-green-50 border border-green-100 mb-3"
                  >
                    <span className="font-medium text-gray-800">
                      {chapter.chapterName}
                    </span>

                    <span className="font-bold text-green-700">
                      {chapter.scorePercent}%
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-sm">
                  No strong chapters identified yet.
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-orange-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <TrendingDown className="w-6 h-6 text-orange-600" />

                <h2 className="text-2xl font-bold text-gray-900">Weak Areas</h2>
              </div>

              {weakChapterResults.map((chapter: any) => (
                <div
                  key={chapter.chapterId}
                  className="flex items-center justify-between p-4 rounded-xl bg-orange-50 border border-orange-100 mb-3"
                >
                  <span className="font-medium text-gray-800">
                    {chapter.chapterName}
                  </span>

                  <span className="font-bold text-orange-700">
                    {chapter.scorePercent}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weak Chapters */}
        {weakChapters.length > 0 && (
          <div className="bg-white rounded-2xl border border-red-200 p-6 shadow-sm mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              Focus More On
            </h2>

            <div className="flex flex-wrap gap-3">
              {weakChapters.map((chapter: string) => (
                <div
                  key={chapter}
                  className="px-4 py-2 rounded-full bg-red-50 border border-red-200 text-red-700 font-medium"
                >
                  {chapter}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resources */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-blue-600" />

            <h2 className="text-2xl font-bold text-gray-900">
              Recommended Learning Resources
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {recommendedResources.map((resource: any) => (
              <a
                key={resource.resourceId}
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="group border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="inline-flex px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
                      {resource.resourceType}
                    </div>

                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition">
                      {resource.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      {resource.recommendedBecause}
                    </p>
                  </div>

                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition flex-shrink-0" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Retake */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/user/aptitude-test")}
            className="px-8 py-4 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:shadow-xl transition-all flex items-center gap-3"
          >
            <RotateCcw className="w-5 h-5" />

            <span>Retake Test</span>
          </button>
        </div>
      </div>
    </div>
  );
}
