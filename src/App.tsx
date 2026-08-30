import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";

import NotFound from "./Layout/NotFound";
import LandingPage from "./Layout/LandingPage";

import MainUserDashboard from "./Layout/MainUserDashboard";

import UserDashboardHome from "./Pages/UserDashboard/UserDashboardHome";
import ProfilePage from "./Pages/UserDashboard/ProfilePage";
import JobRecommendationsPage from "./Pages/UserDashboard/JobRecommendations";
import AppliedJobsPage from "./Pages/UserDashboard/AppliedJobs";
import AptitudeTestPage from "./Pages/UserDashboard/AptitudeTest";
import TestDashboardPage from "./Pages/UserDashboard/TestDashboard";
import TestResultPage from "./Pages/UserDashboard/TestResult";
import SettingsPage from "./Pages/UserDashboard/Settings";

import MainOrganizationDashboard from "./Layout/MainOrganizationDashboard";

import OrganizationProfile from "./Pages/OrganizationDashboard/OrganizationProfile";
import PostVacancy from "./Pages/OrganizationDashboard/PostVacancy";
import ManageVacancies from "./Pages/OrganizationDashboard/ManageVacancies";
import Candidates from "./Pages/OrganizationDashboard/Candidates";
import Applications from "./Pages/OrganizationDashboard/Applications";
import Analytics from "./Pages/OrganizationDashboard/Analytics";
import Settings from "./Pages/OrganizationDashboard/Settings";
import OrganizationDashboardHome from "./Pages/OrganizationDashboard/OrganizationDashboardHome";
import AllVacencies from "./Pages/UserDashboard/AllVacencies";

import MainAdminDashboard from "./Layout/MainAdminDashboard";

import AdminDashboard from "./Pages/AdminD/AdminDashboard";
import StudentsManagement from "./Pages/AdminD/StudentsManagement";
import OrganizationsManagement from "./Pages/AdminD/OrganizationsManagement";
import JobsManagement from "./Pages/AdminD/JobsManagement";
import AptitudeTests from "./Pages/AdminD/AptitudeTests";
import QuestionBank from "./Pages/AdminD/QuestionBank";
import Reports from "./Pages/AdminD/Reports";
import SystemSettings from "./Pages/AdminD/SystemSettings";
import TotalApplications from "./Pages/AdminD/TotalApplications";
import AdminAnalytics from "./Pages/AdminD/AdminAnalytics";
import Login from "./Pages/Forms/Login";
import Register from "./Pages/Forms/Register";
import { ToastContainer } from "react-toastify";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/user" element={<MainUserDashboard />}>
        <Route index element={<UserDashboardHome />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="jobs" element={<JobRecommendationsPage />} />
        <Route path="all-jobs" element={<AllVacencies />} />
        <Route path="applied" element={<AppliedJobsPage />} />
        <Route path="aptitude-test" element={<AptitudeTestPage />} />
        <Route path="test-dashboard" element={<TestDashboardPage />} />
        <Route path="test-result" element={<TestResultPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      <Route path="/organization" element={<MainOrganizationDashboard />}>
        <Route
          index
          element={<Navigate to="/organization/dashboard" replace />}
        />
        <Route path="dashboard" element={<OrganizationDashboardHome />} />
        <Route path="profile" element={<OrganizationProfile />} />
        <Route path="post-job" element={<PostVacancy />} />
        <Route path="manage-jobs" element={<ManageVacancies />} />
        <Route path="candidates" element={<Candidates />} />
        <Route path="applications" element={<TotalApplications />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="/admin" element={<MainAdminDashboard />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<StudentsManagement />} />
        <Route path="organizations" element={<OrganizationsManagement />} />
        <Route path="jobs" element={<JobsManagement />} />
        <Route path="aptitude-tests" element={<AptitudeTests />} />
        <Route path="questions" element={<QuestionBank />} />
        <Route path="applications" element={<Applications />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<SystemSettings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      // rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme="light"
      style={{ zIndex: 9999 }}
    />
  </BrowserRouter>
);

export default App;
