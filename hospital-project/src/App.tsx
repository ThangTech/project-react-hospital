import Footer from './components/layout/footer'
import Header from './components/layout/header'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
