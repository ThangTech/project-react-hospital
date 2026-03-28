import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { StyleProvider } from '@ant-design/cssinjs'
import { ConfigProvider } from 'antd';
import './index.css'
import App from './App.tsx'
import ErrorPage from './pages/errors/error.tsx'
import NotFoundPage from './pages/errors/notFound.tsx'
import LoginPage from './pages/LoginPage.tsx'
import HomePage from './pages/HomePage.tsx'
import DoctorPage from './pages/DoctorPage.tsx'
import DepartmentPage from './pages/DepartmentPage.tsx'
import ServicePage from './pages/ServicePage.tsx'
import ContactPage from './pages/ContactPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'bac-si', element: <DoctorPage /> },
      { path: 'khoa-phong', element: <DepartmentPage /> },
      { path: 'dich-vu', element: <ServicePage /> },
      { path: 'lien-he', element: <ContactPage /> },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* StyleProvider layer: ép antd inject CSS vào @layer antd
        → Tailwind utilities sẽ thắng antd khi conflict */}
    <StyleProvider layer>
      <ConfigProvider>
        <RouterProvider router={router} />
      </ConfigProvider>
    </StyleProvider>
  </StrictMode>,
)

