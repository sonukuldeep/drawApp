import { useState } from 'react'
import './App.css'

function App() {
  document.addEventListener('touchstart', e=>{
    [...e.changedTouches].forEach(touch=>{
      const dot = document.createElement('div')
      dot.classList.add('dot')
      dot.style.top = `${touch.pageX}px`
      dot.style.left = `${touch.pageY}px`
      dot.id = touch.identifier
      document.body.append(dot)
    })
  })
  return (
    <>
      <div className='topHalf'></div>
    </>
  )
}

export default App
