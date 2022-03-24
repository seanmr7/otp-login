import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import PhoneInput from './components/PhoneInput'
import OtpInput from './components/OtpInput'

function App() {
  const [confirmRes, setConfirmRes] = useState({})
  return (
    <>
      <Router>
        <div className='h-screen flex flex-col'>
          <Navbar />
          <main className='flex flex-col flex-1 w-full px-3 md:w-1/2 mx-auto'>
            <PhoneInput setConfirmRes={setConfirmRes} />
            <OtpInput confirmRes={confirmRes} />
          </main>
          <Footer />
        </div>
      </Router>

      <ToastContainer autoClose={10000} pauseOnHover closeOnClick />
    </>
  )
}

export default App
