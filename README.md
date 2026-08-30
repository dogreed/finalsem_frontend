# InternHub

InternHub is a web platform for students, organizations, and admins to manage internships, vacancies, aptitude tests, and applications.


**Tech stack:** React, TypeScript, Vite, Tailwind CSS, Axios, React Router, Recharts.

**Structure:** 

## 📂 Project Structure

```text
InternHub
├── public/
├── src/
│   ├── api/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── organization/
│   │   └── student/
│   │
│   ├── assets/
│   │
│   ├── Components/
│   │   ├── Admin/
│   │   ├── Forms/
│   │   ├── models/
│   │   ├── Organization/
│   │   └── Students/
│   │
│   ├── constants/
│   │  
│   │
│   ├── hooks/
│   │
│   ├── images/
│   │   ├── admin/
│   │   ├── organization/
│   │   └── student/
│   │
│   ├── Layout/
│   │   ├── Header.tsx
│   │   ├── LandingPage.tsx
│   │   ├── MainAdminDashboard.tsx
│   │   ├── MainOrganizationDashboard.tsx
│   │   ├── MainUserDashboard.tsx
│   │   ├── NotFound.tsx
│   │   └── Sidebar.tsx
│   │
│   ├── lib/
│   │   └── axios.ts
│   │
│   ├── Pages/
│   │   ├── AdminD/
│   │   ├── Forms/
│   │   ├── landing/
│   │   ├── OrganizationDashboard/
│   │   └── UserDashboard/
│   │
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```


**Quick start**

Install and run locally:

```bash
npm install
npm run dev
# build for production
npm run build
# preview production build
npm run preview
```
# Application Screenshots

## 👨‍💼 Admin

### Dashboard
![](src/images/admin/ad_dash.png)

| Manage Students | Manage Organizations |
|-----------------|----------------------|
| ![](src/images/admin/ad_manage_stu.png) | ![](src/images/admin/ad_manage_orgs.png) |

| Question Bank | Questions |
|---------------|-----------|
| ![](src/images/admin/ad_questionbacnk.png) | ![](src/images/admin/ad_questions.png) |

---

## 🏢 Organization

### Dashboard
![](src/images/organization/org-dash.png)

| Post Vacancy | Manage Vacancies |
|--------------|------------------|
| ![](src/images/organization/0rg_vacency_post.png) | ![](src/images/organization/org_manage_vac.png) |

| Edit Vacancy | Candidates |
|--------------|------------|
| ![](src/images/organization/org_edit_vac.png) | ![](src/images/organization/org_candidates.png) |

---

## 🎓 Student

### Dashboard
![](src/images/student/student_dash.png)

| Jobs | Applied Jobs |
|------|--------------|
| ![](src/images/student/student_jobs.png) | ![](src/images/student/student_applied.png) |

| Aptitude Tests | Settings |
|----------------|----------|
| ![](src/images/student/student_tests.png) | ![](src/images/student/student_setting.png) |