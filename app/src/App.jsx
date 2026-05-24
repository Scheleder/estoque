import { Outlet } from 'react-router-dom';
import Header from './modules/header.jsx'
import Footer from './modules/footer.jsx'
import Sidebar from './modules/sidebar.jsx'
import { Toaster } from "@/components/ui/toaster"
import { useApiInterceptor } from './services/config.jsx';

function App() {
  //localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzE2ODU4MjYyfQ.ZkFHaoiYCTX52O2OL9UYJNRX8M0-izD7OtULQEr6rx4')
  useApiInterceptor();

  return (
    <>
      <Header />
      <Outlet/>
      <Sidebar />
      <Footer />
    </>
  )
}

export default App
