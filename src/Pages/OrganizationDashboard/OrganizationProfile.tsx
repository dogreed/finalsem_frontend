import { Building2, Globe, Linkedin, Twitter, Facebook } from 'lucide-react';

export default function OrganizationProfile() {
  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Organization Profile</h1>
        <p className="text-gray-600 mt-1">Manage your company information and presence</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                defaultValue="Tech Corp"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Industry
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Technology</option>
                <option>Finance</option>
                <option>Healthcare</option>
                <option>Education</option>
                <option>Retail</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              defaultValue="San Francisco, CA"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Company Description
            </label>
            <textarea
              rows={6}
              defaultValue="We are a leading technology company focused on innovative solutions for modern businesses. Our team of experts delivers cutting-edge software products that help organizations transform digitally and achieve their goals."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Building2 className="h-5 w-5 mr-2" />
              Social Links
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  Website
                </label>
                <input
                  type="url"
                  defaultValue="https://techcorp.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </label>
                <input
                  type="url"
                  defaultValue="https://linkedin.com/company/techcorp"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </label>
                <input
                  type="url"
                  placeholder="https://twitter.com/techcorp"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Facebook className="h-4 w-4 mr-2" />
                  Facebook
                </label>
                <input
                  type="url"
                  placeholder="https://facebook.com/techcorp"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
