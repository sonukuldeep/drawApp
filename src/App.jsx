import dist from '@vitejs/plugin-react'
import { useState } from 'react'
import './App.css'

function App() {
  document.addEventListener('touchstart', e=>{
    [...e.changedTouches].forEach(touch=>{
      const dot = document.createElement('div')
      dot.classList.add('dot')
      dot.style.top = `${touch.pageY}px`
      dot.style.left = `${touch.pageX}px`
      dot.id = touch.identifier
      document.body.append(dot)
    })
  })

  function remove(){
    const dots = document.querySelectorAll('.dot')
    dots.forEach(dot=>{dot.remove()})
  }
  return (
    <>
      <div className='topHalf'></div>
      <button onClick={remove}>Clear</button>
    </>
  )
}

export default App
