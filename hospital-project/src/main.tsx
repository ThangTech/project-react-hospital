import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { StyleProvider } from '@ant-design/cssinjs'
import './index.css'
import App from './App.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      //mỗi page mới sẽ được thêm vào đây
      //{ index: true, element: <HomePage /> },
      //{ path: 'doctor', element: <DoctorPage /> },
    ],
  },
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

