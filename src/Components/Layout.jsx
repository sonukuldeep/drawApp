import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = (props) => {
  return (
    <>
        <Navbar remove={props.remove} colorChange={props.colorChange} lineWidth={props.lineWidth} selectLine={props.selectLine}/>  
        {props.children}
        <Footer/>
    </>
  )
}

export default Layout