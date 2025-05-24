import { useState } from 'react'
import { BrowserRouter , Routes, Route } from 'react-router-dom';

import './App.css'
import PageNotFound from './Pages/PageNotFound';
import Login from './Pages/Login';
import UserSignUp from './Pages/User_sign_up';
import { Toaster } from 'react-hot-toast';


function App() {
  

  return (
    <>
   <BrowserRouter>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/UserSignUp" element={<UserSignUp />} />
      </Routes>
      <Toaster />
    </BrowserRouter>

    </>
  )
}

export default App
