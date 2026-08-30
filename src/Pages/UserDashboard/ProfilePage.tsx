import {
  Upload,
  Plus,
  Github,
  Globe,
  Linkedin,
  Loader2,
  Pencil,
  Save,
  FileText,
  X,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

import { uploadResume } from "../../api/student/resume/upload-resume";
import { getStudentProfile } from "../../api/student/profile/get-student-profile";
import { updateStudentProfile } from "../../api/student/profile/put-student-profile";
import { uploadStudentPhoto } from "../../api/student/profile/upload-photo";

import { useToast } from "../../hooks/useToasts";

export default function ProfilePage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const photoInputRef = useRef<HTMLInputElement | null>(null);

  const { showSuccess, showError } = useToast();

  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [photoUrl, setPhotoUrl] = useState("");

  const [resumeUrl, setResumeUrl] = useState("");

  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const [isUploading, setIsUploading] = useState(false);

  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  const [isSaving, setIsSaving] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");

  const [bio, setBio] = useState("");

  const [nationality, setNationality] = useState("");

  const [location, setLocation] = useState("");

  const [educationLevel, setEducationLevel] = useState<number>(1);

  const [fieldOfStudy, setFieldOfStudy] = useState("");

  const [github, setGithub] = useState("");

  const [portfolio, setPortfolio] = useState("");

  const [linkedin, setLinkedin] = useState("");

  useEffect(() => {
    fetchStudentProfile();
  }, []);

  const fetchStudentProfile = async () => {
    try {
      setIsLoadingProfile(true);

      const response = await getStudentProfile();

      setFullName(response.fullName || "");

      setEmail(response.email || "");

      setPhoneNumber(response.phoneNumber || "");

      setBio(response.bio || "");

      setPhotoUrl(response.photoUrl || "");

      setResumeUrl(response.resumeUrl || "");

      setNationality(response.nationality || "");

      setLocation(response.location || "");

      setFieldOfStudy(response.fieldOfStudy || "");

      setGithub(response.gitHubUrl || "");

      setPortfolio(response.portfolioUrl || "");

      setLinkedin(response.linkedInUrl || "");

      setSkills(
        response.confirmedSkills?.map(
          (skill: { name: string }) => skill.name,
        ) || [],
      );
    } catch (error) {
      console.error("Failed to fetch profile:", error);

      showError("Failed to fetch profile");
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);

      await updateStudentProfile({
        fullName,
        phoneNumber,
        bio,
        nationality,
        location,
        educationLevel,
        fieldOfStudy,
        gitHubUrl: github,
        portfolioUrl: portfolio,
        linkedInUrl: linkedin,
      });

      showSuccess("Profile updated successfully");

      setIsEditing(false);

      await fetchStudentProfile();
    } catch (error) {
      console.error("Failed to update profile:", error);

      showError("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const maxSize = 4.9 * 1024 * 1024;

    if (file.size > maxSize) {
      showError("Image size must be less than 4.9 MB");

      e.target.value = "";

      return;
    }

    try {
      setIsUploadingPhoto(true);

      const response = await uploadStudentPhoto(file);

      setPhotoUrl(response.photoUrl || response);

      showSuccess("Profile photo updated");

      await fetchStudentProfile();
    } catch (error) {
      console.error(error);

      showError("Failed to upload photo");
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);

      setNewSkill("");
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);

    try {
      setIsUploading(true);

      const formData = new FormData();

      formData.append("file", file);

      const response = await uploadResume(formData);

      if (response?.suggestions) {
        setSkills(
          response.suggestions.map(
            (item: { skillName: string }) => item.skillName,
          ),
        );
      }

      showSuccess("Resume uploaded successfully");

      await fetchStudentProfile();
    } catch (error) {
      console.error("Resume upload failed:", error);

      showError("Resume upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center ">
        <div className="w-full max-w-5xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">
                My Profile
              </h1>

              <p className="text-gray-600">
                Manage your profile information and preferences
              </p>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              disabled={isEditing}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 font-medium transition-all ${
                isEditing
                  ? "cursor-not-allowed bg-gray-100 text-gray-400"
                  : "border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-pointer"
              }`}
            >
              <Pencil className="h-4 w-4" />
              Edit Profile
            </button>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="mb-8 flex items-start justify-between">
                <div className="flex items-center gap-5">
                  <div className="h-24 w-24 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
                    {photoUrl ? (
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}${encodeURI(photoUrl)}`}
                        alt={fullName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-gray-400">
                        {fullName?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {fullName || "Unnamed User"}
                      </h2>

                      <button
                        type="button"
                        onClick={() => photoInputRef.current?.click()}
                        disabled={isUploadingPhoto}
                        className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100 cursor-pointer"
                      >
                        {isUploadingPhoto ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Upload className="h-4 w-4" />
                        )}
                        Upload Photo
                      </button>
                    </div>

                    <p className="mt-1 text-gray-500">{email}</p>

                    <input
                      ref={photoInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <ProfileField
                  label="Full Name"
                  value={fullName}
                  editable={isEditing}
                  onChange={setFullName}
                />

                <ProfileField label="Email" value={email} editable={false} />

                <ProfileField
                  label="Phone Number"
                  value={phoneNumber}
                  editable={isEditing}
                  onChange={setPhoneNumber}
                />

                <ProfileField
                  label="Nationality"
                  value={nationality}
                  editable={isEditing}
                  onChange={setNationality}
                />

                <ProfileField
                  label="Location"
                  value={location}
                  editable={isEditing}
                  onChange={setLocation}
                />

                <ProfileField
                  label="Field Of Study"
                  value={fieldOfStudy}
                  editable={isEditing}
                  onChange={setFieldOfStudy}
                />

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-500">
                    Education Level
                  </label>

                  <select
                    disabled={!isEditing}
                    value={educationLevel}
                    onChange={(e) => setEducationLevel(Number(e.target.value))}
                    className={`w-full rounded-lg border px-4 py-2 transition-all focus:ring-2 focus:ring-blue-500 ${
                      isEditing
                        ? "border-gray-300 bg-white text-gray-900"
                        : "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-700"
                    }`}
                  >
                    <option value={1}>SEE</option>

                    <option value={2}>+2</option>

                    <option value={3}>Bachelor</option>

                    <option value={4}>Master</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-500">
                    Bio
                  </label>

                  <textarea
                    value={bio}
                    disabled={!isEditing}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    className={`w-full rounded-lg border px-4 py-3 transition-all focus:ring-2 focus:ring-blue-500 ${
                      isEditing
                        ? "border-gray-300 bg-white text-gray-900"
                        : "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-700"
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                Skills
              </h2>

              <div className="mb-4 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="rounded-full bg-blue-100 px-4 py-2 text-blue-700"
                  >
                    <span className="font-medium">{skill}</span>
                  </div>
                ))}
              </div>

              {isEditing && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addSkill()}
                    placeholder="Add a skill"
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    onClick={addSkill}
                    className="flex items-center space-x-2 rounded-lg bg-linear-to-r from-blue-600 to-cyan-500 px-4 py-2 font-medium text-white transition-all hover:shadow-lg"
                  >
                    <Plus className="h-5 w-5" />

                    <span>Add</span>
                  </button>
                </div>
              )}
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Resume</h2>

                {resumeUrl && (
                  <button
                    type="button"
                    onClick={() => setIsResumeModalOpen(true)}
                    className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100 cursor-pointer"
                  >
                    <FileText className="h-4 w-4" />
                    View Resume
                  </button>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleResumeUpload}
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition-colors hover:border-blue-500"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-500" />

                    <p className="font-medium text-blue-600">
                      Uploading Resume...
                    </p>
                  </>
                ) : (
                  <>
                    <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />

                    <p className="mb-2 text-gray-600">
                      Upload your resume (PDF)
                    </p>

                    <p className="mb-4 text-sm text-gray-500">
                      We'll automatically extract your skills and experience
                    </p>

                    <button
                      type="button"
                      className="rounded-lg bg-linear-to-r from-blue-600 to-cyan-500 px-6 py-2 font-medium text-white transition-all hover:shadow-lg cursor-pointer"
                    >
                      Choose File
                    </button>
                  </>
                )}
              </div>

              {selectedFile && (
                <div className="mt-4 rounded-lg bg-blue-50 p-4">
                  <p className="text-sm font-medium text-blue-700">
                    Uploaded Resume: {selectedFile.name}
                  </p>
                </div>
              )}
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                Social Links
              </h2>

              <div className="space-y-4">
                <SocialField
                  label="GitHub"
                  icon={<Github className="h-4 w-4" />}
                  value={github}
                  editable={isEditing}
                  onChange={setGithub}
                  placeholder="https://github.com/username"
                />

                <SocialField
                  label="Portfolio"
                  icon={<Globe className="h-4 w-4" />}
                  value={portfolio}
                  editable={isEditing}
                  onChange={setPortfolio}
                  placeholder="https://portfolio.com"
                />

                <SocialField
                  label="LinkedIn"
                  icon={<Linkedin className="h-4 w-4" />}
                  value={linkedin}
                  editable={isEditing}
                  onChange={setLinkedin}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="sticky bottom-0 z-50 pt-6">
          <div className="rounded-2xl border border-blue-100 bg-white/95 p-4 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  You have unsaved changes
                </h3>

                <p className="text-sm text-gray-500">
                  Save your profile updates before leaving this page.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="rounded-xl border border-gray-200 px-5 py-2.5 font-medium text-gray-700 transition-all hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-6 py-2.5 font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
                >
                  {isSaving ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Save className="h-5 w-5" />
                  )}
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isResumeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="relative h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Resume Preview
              </h3>

              <button
                onClick={() => setIsResumeModalOpen(false)}
                className="rounded-lg p-2 transition hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            <div className="h-[calc(90vh-73px)] w-full">
              <iframe
                src={`${import.meta.env.VITE_BACKEND_URL}${resumeUrl}`}
                title="Resume Preview"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

type ProfileFieldProps = {
  label: string;
  value: string;
  editable?: boolean;
  onChange?: (value: string) => void;
};

function ProfileField({ label, value, editable, onChange }: ProfileFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-500">
        {label}
      </label>

      <input
        type="text"
        value={value}
        disabled={!editable}
        onChange={(e) => onChange?.(e.target.value)}
        className={`w-full rounded-lg border px-4 py-2 transition-all focus:ring-2 focus:ring-blue-500 ${
          editable
            ? "border-gray-300 bg-white text-gray-900"
            : "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-700"
        }`}
      />
    </div>
  );
}

type SocialFieldProps = {
  label: string;
  icon: React.ReactNode;
  value: string;
  editable?: boolean;
  onChange?: (value: string) => void;
  placeholder?: string;
};

function SocialField({
  label,
  icon,
  value,
  editable,
  onChange,
  placeholder,
}: SocialFieldProps) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-500">
        {icon}
        {label}
      </label>

      <input
        type="url"
        value={value}
        disabled={!editable}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-4 py-2 transition-all focus:ring-2 focus:ring-blue-500 ${
          editable
            ? "border-gray-300 bg-white text-gray-900"
            : "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-700"
        }`}
      />
    </div>
  );
}
