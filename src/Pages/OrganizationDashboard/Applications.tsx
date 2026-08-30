import { Eye, CheckCircle, XCircle, FileText } from 'lucide-react';

export default function Applications() {
  const applications = [
    {
      id: 1,
      candidateName: 'Sarah Johnson',
      jobTitle: 'Senior React Developer',
      match: 92,
      aptitude: 88,
      missingSkills: [],
      status: 'Pending',
      appliedDate: '2026-03-01',
    },
    {
      id: 2,
      candidateName: 'Michael Chen',
      jobTitle: 'Full Stack Engineer',
      match: 85,
      aptitude: 91,
      missingSkills: [],
      status: 'Shortlisted',
      appliedDate: '2026-02-28',
    },
    {
      id: 3,
      candidateName: 'Emily Rodriguez',
      jobTitle: 'DevOps Engineer',
      match: 65,
      aptitude: 82,
      missingSkills: ['Docker', 'AWS'],
      status: 'Pending',
      appliedDate: '2026-02-27',
    },
    {
      id: 4,
      candidateName: 'David Kim',
      jobTitle: 'Backend Developer',
      match: 88,
      aptitude: 85,
      missingSkills: [],
      status: 'Shortlisted',
      appliedDate: '2026-02-26',
    },
    {
      id: 5,
      candidateName: 'Lisa Anderson',
      jobTitle: 'Frontend Developer',
      match: 58,
      aptitude: 79,
      missingSkills: ['TypeScript', 'Testing'],
      status: 'Rejected',
      appliedDate: '2026-02-25',
    },
    {
      id: 6,
      candidateName: 'Ryan Martinez',
      jobTitle: 'Backend Developer',
      match: 89,
      aptitude: 91,
      missingSkills: [],
      status: 'Pending',
      appliedDate: '2026-02-24',
    },
  ];

  const getMatchColor = (match: number) => {
    if (match >= 70) return 'text-green-600 bg-green-100';
    if (match >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusColor = (status: string) => {
    if (status === 'Shortlisted') return 'text-green-600 bg-green-100';
    if (status === 'Pending') return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-600 mt-1">Review and manage all job applications</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Candidate Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Applied Job
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Match %
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Aptitude Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Missing Skills
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm mr-3">
                        {app.candidateName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="font-medium text-gray-900">{app.candidateName}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {app.jobTitle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getMatchColor(app.match)}`}>
                      {app.match}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 rounded-full text-sm font-semibold text-blue-600 bg-blue-100">
                      {app.aptitude}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {app.missingSkills.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {app.missingSkills.map((skill) => (
                          <span key={skill} className="px-2 py-1 rounded text-xs font-medium text-red-600 bg-red-100">
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {app.status === 'Pending' && (
                        <>
                          <button className="p-1 text-green-600 hover:text-green-700" title="Shortlist">
                            <CheckCircle className="h-5 w-5" />
                          </button>
                          <button className="p-1 text-red-600 hover:text-red-700" title="Reject">
                            <XCircle className="h-5 w-5" />
                          </button>
                        </>
                      )}
                      <button className="p-1 text-blue-600 hover:text-blue-700" title="View Profile">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="p-1 text-gray-600 hover:text-gray-700" title="View Resume">
                        <FileText className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
