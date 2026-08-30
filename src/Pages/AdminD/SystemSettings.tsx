export default function SystemSettings() {
  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">

      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          System Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configure platform settings
        </p>
      </div>

      {/* Platform Settings */}
      <div className="bg-white rounded-xl border p-6 space-y-4">
        <h3 className="font-display font-semibold">Platform Settings</h3>

        <div>
          <label className="text-sm font-medium">Platform Name</label>
          <input
            className="mt-1.5 w-full border rounded-md px-3 py-2 text-sm"
            defaultValue="JobMatch"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Logo Upload</label>

          <div className="mt-1.5 border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors">
            <p className="text-sm text-gray-500">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-400 mt-1">
              PNG, JPG up to 2MB
            </p>
          </div>
        </div>
      </div>

      {/* Aptitude Test Settings */}
      <div className="bg-white rounded-xl border p-6 space-y-4">
        <h3 className="font-display font-semibold">Aptitude Test Settings</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">
              Default Test Duration (minutes)
            </label>

            <input
              className="mt-1.5 w-full border rounded-md px-3 py-2 text-sm"
              type="number"
              defaultValue="30"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Max Attempts
            </label>

            <input
              className="mt-1.5 w-full border rounded-md px-3 py-2 text-sm"
              type="number"
              defaultValue="3"
            />
          </div>
        </div>
      </div>

      {/* User Settings */}
      <div className="bg-white rounded-xl border p-6 space-y-4">
        <h3 className="font-display font-semibold">User Settings</h3>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">
              Allow Resume Upload
            </p>
            <p className="text-xs text-gray-500">
              Users can upload their resume to their profile
            </p>
          </div>

          <input type="checkbox" defaultChecked className="w-5 h-5" />
        </div>

        <hr />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">
              Allow Skill Recommendations
            </p>
            <p className="text-xs text-gray-500">
              AI-powered skill suggestions based on aptitude results
            </p>
          </div>

          <input type="checkbox" defaultChecked className="w-5 h-5" />
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-xl border p-6 space-y-4">
        <h3 className="font-display font-semibold">Security</h3>

        <div>
          <label className="text-sm font-medium">
            Change Admin Password
          </label>

          <input
            type="password"
            placeholder="New password"
            className="mt-1.5 w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        <hr />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">
              Enable Two-Factor Authentication
            </p>
            <p className="text-xs text-gray-500">
              Add an extra layer of security to admin accounts
            </p>
          </div>

          <input type="checkbox" className="w-5 h-5" />
        </div>
      </div>

      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
        Save Settings
      </button>

    </div>
  );
}