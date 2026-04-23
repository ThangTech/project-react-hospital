import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";
import { AuthProvider } from "./context/AuthContext";
import { UIProvider } from "./context/UIContext";
import "./index.css";

// Layouts
import App from "./App.tsx";
import AdminLayout from "./components/layout/AdminLayout.tsx";

// Public pages
import HomePage from "./pages/HomePage.tsx";
import DoctorPage from "./pages/DoctorPage.tsx";
import DepartmentPage from "./pages/DepartmentPage.tsx";
import ServicePage from "./pages/ServicePage.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";

// Auth pages
import LoginPage from "./pages/auth/LoginPage.tsx";
import RegisterPage from "./pages/auth/RegisterPage.tsx";
import ForgotPasswordPage from "./pages/auth/ForgotPassword.tsx";

// Error pages
import ErrorPage from "./pages/errors/error.tsx";
import NotFoundPage from "./pages/errors/notFound.tsx";

// Admin pages
import AdminDashboard from "./pages/dashboard/AdminDashboard.tsx";
import DoctorDashboard from "./pages/dashboard/DoctorDashboard.tsx";
import NurseDashboard from "./pages/dashboard/NurseDashboard.tsx";
import AccountantDashboard from "./pages/dashboard/AccountantDashboard.tsx";
import PatientListPage from "./pages/patients/PatientListPage.tsx";
import PatientDetailPage from "./pages/patients/PatientDetailPage.tsx";
import AdmissionListPage from "./pages/admissions/AdmissionListPage.tsx";
import MedicalRecordListPage from "./pages/medical-records/MedicalRecordListPage.tsx";
import BedListPage from "./pages/beds/BedListPage.tsx";
import SurgeryListPage from "./pages/surgeries/SurgeryListPage.tsx";
import InvoiceListPage from "./pages/invoices/InvoiceListPage.tsx";
import ReportPage from "./pages/reports/ReportPage.tsx";

// Shared components
import ProtectedRoute from "./components/shared/ProtectedRoute.tsx";

const router = createBrowserRouter([
  // ═══ Public layout (Header + Footer) ═══
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "doctor", element: <DoctorPage /> },
      { path: "department", element: <DepartmentPage /> },
      { path: "service", element: <ServicePage /> },
      { path: "blog", element: <BlogPage /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },

  // ═══ Auth pages (không layout) ═══
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },

  // ═══ Admin layout (AdminNavbar, không Footer) ═══
  {
    element: (
      <ProtectedRoute allowedRoles={["Admin", "BacSi", "YTa", "KeToan"]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/dashboard/admin",      element: <AdminDashboard /> },
      { path: "/dashboard/doctor",     element: <DoctorDashboard /> },
      { path: "/dashboard/nurse",      element: <NurseDashboard /> },
      { path: "/dashboard/accountant", element: <AccountantDashboard /> },
      { path: "/patients",             element: <PatientListPage /> },
      { path: "/patients/:id",         element: <PatientDetailPage /> },
      { path: "/admissions",           element: <AdmissionListPage /> },
      { path: "/medical-records",      element: <MedicalRecordListPage /> },
      { path: "/surgeries",            element: <SurgeryListPage /> },
      { path: "/beds",                 element: <BedListPage /> },
      { path: "/invoices",             element: <InvoiceListPage /> },
      { path: "/reports",              element: <ReportPage /> },
    ],
  },

  // ═══ 404 ═══
  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyleProvider layer>
      <ConfigProvider>
        {/* AuthProvider + UIProvider thay thế RecoilRoot */}
        <AuthProvider>
          <UIProvider>
            <RouterProvider router={router} />
          </UIProvider>
        </AuthProvider>
      </ConfigProvider>
    </StyleProvider>
  </StrictMode>,
);
