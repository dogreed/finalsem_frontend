import { Trophy, TrendingUp, Target, Calendar } from 'lucide-react';

const pastAttempts = [
  { id: 1, date: 'Mar 1, 2026', stack: 'MERN Stack', score: 78, percentile: 82 },
  { id: 2, date: 'Feb 15, 2026', stack: 'MERN Stack', score: 72, percentile: 75 },
  { id: 3, date: 'Jan 28, 2026', stack: 'MERN Stack', score: 65, percentile: 68 },
];

const topicPerformance = [
  { topic: 'Routing', scores: [60, 70, 85] },
  { topic: 'State Management', scores: [55, 65, 72] },
  { topic: 'Authentication', scores: [75, 85, 90] },
  { topic: 'API Integration', scores: [50, 60, 65] },
];

export default function TestDashboard() {
  const latestScore = pastAttempts[0].score;
  const improvement = latestScore - pastAttempts[1].score;
  const percentile = pastAttempts[0].percentile;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Dashboard</h1>
        <p className="text-gray-600">Track your progress and performance analytics</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Latest Score</h3>
          <p className="text-3xl font-bold text-gray-900">{latestScore}%</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-green-200 bg-green-50">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-green-700 text-sm mb-1">Improvement</h3>
          <p className="text-3xl font-bold text-green-700">+{improvement}%</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-purple-200 bg-purple-50">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-purple-700 text-sm mb-1">Percentile Rank</h3>
          <p className="text-3xl font-bold text-purple-700">{percentile}th</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-cyan-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-cyan-600" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm mb-1">Tests Taken</h3>
          <p className="text-3xl font-bold text-gray-900">{pastAttempts.length}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Score Improvement Graph</h2>
          <div className="space-y-6">
            <div className="flex items-end justify-between h-48">
              {pastAttempts.reverse().map((attempt, index) => {
                const height = (attempt.score / 100) * 100;
                return (
                  <div key={attempt.id} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex items-end justify-center mb-2">
                      <div
                        className="w-16 bg-linear-to-t from-blue-600 to-cyan-500 rounded-t-lg relative group"
                        style={{ height: `${height}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                          {attempt.score}%
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 text-center mt-2">
                      Attempt {index + 1}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-600">Test Progress</span>
              <span className="text-sm font-semibold text-green-600">
                +{improvement}% improvement
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Topic Performance Chart</h2>
          <div className="space-y-4">
            {topicPerformance.map((topic) => {
              const latestScore = topic.scores[topic.scores.length - 1];
              const firstScore = topic.scores[0];
              const improvement = latestScore - firstScore;
              return (
                <div key={topic.topic}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">{topic.topic}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{latestScore}%</span>
                      <span
                        className={`text-xs font-semibold ${
                          improvement > 0 ? 'text-green-600' : 'text-gray-400'
                        }`}
                      >
                        {improvement > 0 ? `+${improvement}%` : '—'}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        latestScore >= 80
                          ? 'bg-linear-to-r from-green-500 to-emerald-500'
                          : latestScore >= 70
                          ? 'bg-linear-to-r from-blue-500 to-cyan-500'
                          : 'bg-linear-to-r from-yellow-500 to-orange-500'
                      }`}
                      style={{ width: `${latestScore}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Past Attempts</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Stack</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Score</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Percentile
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pastAttempts.map((attempt) => (
                <tr key={attempt.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700">{attempt.date}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {attempt.stack}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        attempt.score >= 80
                          ? 'bg-green-100 text-green-700'
                          : attempt.score >= 70
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {attempt.score}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{attempt.percentile}th</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 bg-linear-to-r from-blue-600 to-cyan-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">Keep improving your ranking!</h3>
            <p className="text-blue-100">
              You're in the top {100 - percentile}% of all test takers. Take another test to improve further.
            </p>
          </div>
          <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-xl transition-all">
            Take New Test
          </button>
        </div>
      </div>
    </div>
  );
}
