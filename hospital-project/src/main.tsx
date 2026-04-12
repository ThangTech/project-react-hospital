import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";
import { RecoilRoot } from "recoil";
import "./index.css";
import App from "./App.tsx";
import ErrorPage from "./pages/errors/error.tsx";
import NotFoundPage from "./pages/errors/notFound.tsx";
import HomePage from "./pages/HomePage.tsx";
import DoctorPage from "./pages/DoctorPage.tsx";
import DepartmentPage from "./pages/DepartmentPage.tsx";
import ServicePage from "./pages/ServicePage.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
import RegisterPage from "./pages/auth/RegisterPage.tsx";
import ForgotPasswordPage from "./pages/auth/ForgotPassword.tsx";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/doctor", element: <DoctorPage /> },
      { path: "/department", element: <DepartmentPage /> },
      { path: "/service", element: <ServicePage /> },
      { path: "/blog", element: <BlogPage /> },
      { path: "/contact", element: <ContactPage /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/dashboard/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/dashboard/doctor",
    element: <DoctorDashboard />,
  },
  {
    path: "/dashboard/nurse",
    element: <NurseDashboard />,
  },
  {
    path: "/dashboard/accountant",
    element: <AccountantDashboard />,
  },
  {
    path: "/patients",
    element: <PatientListPage />,
  },
  {
    path: "/patients/:id",
    element: <PatientDetailPage />,
  },
  {
    path: "/admissions",
    element: <AdmissionListPage />,
  },
  {
    path: "/medical-records",
    element: <MedicalRecordListPage />,
  },
  {
    path: "/beds",
    element: <BedListPage />,
  },
  {
    path: "/surgeries",
    element: <SurgeryListPage />,
  },
  {
    path: "/invoices",
    element: <InvoiceListPage />,
  },
  {
    path: "/reports",
    element: <ReportPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* StyleProvider layer: ép antd inject CSS vào @layer antd
        → Tailwind utilities sẽ thắng antd khi conflict */}
    <StyleProvider layer>
      <ConfigProvider>
        <RecoilRoot>
          <RouterProvider router={router} />
        </RecoilRoot>
      </ConfigProvider>
    </StyleProvider>
  </StrictMode>,
);
