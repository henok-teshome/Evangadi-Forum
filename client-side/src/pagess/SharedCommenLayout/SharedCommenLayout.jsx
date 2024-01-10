
import React from 'react'
import Header from '../../pagess/Header/Header'
import Footer from '../../pagess/Footer/Footer'
import { Outlet } from 'react-router-dom'
 function SharedCommenLayout() {
  return  (
    <>
    <Header />
    <Outlet />
    <Footer />
    </>
  )
  }
  export default SharedCommenLayout;