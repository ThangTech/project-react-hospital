import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { StyleProvider } from '@ant-design/cssinjs'
import './index.css'
import App from './App.tsx'
import ErrorPage from './pages/errors/error.tsx'
import NotFoundPage from './pages/errors/notFound.tsx'
import LoginPage from './pages/LoginPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      //mỗi page mới sẽ được thêm vào đây
      //{ index: true, element: <HomePage /> },
      //{ path: 'doctor', element: <DoctorPage /> },
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
      <RouterProvider router={router} />
    </StyleProvider>
  </StrictMode>,
)

