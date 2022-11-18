import './App.css'

function App() {

  function positionDot(e, dot) {
    dot.style.top = `${e.pageY}px`
    dot.style.left = `${e.pageX}px`
    dot.style.width = `${e.width * 10}px`
    dot.style.height = `${e.height * 10}px`
  }
  function startDrawing(){

    const topHalf = document.querySelector('.topHalf')
    topHalf.addEventListener('mousedown', e => {
      const dot = document.createElement('div')
      dot.classList.add('dot')
      dot.id = e.pointerId
      positionDot(e, dot)
      document.body.append(dot)
    })
    
    
    
    topHalf.addEventListener('pointermove', e => {
      
      const dot = document.getElementById(e.pointerId)
      if (dot === null) return
      positionDot(e, dot)
      const newdot = document.createElement('div')
      newdot.classList.add('dot')
      positionDot(e, newdot)

      document.body.append(newdot)
      
      // positionDot(e, dot)
    })

    // topHalf.addEventListener('pointerup', e => {
      
    //   const dot = document.getElementById(e.pointerId)
    //   if (dot === null) return
    //   dot.remove()
    // })
    
    // topHalf.addEventListener('pointercancel', e => {
      
    //   const dot = document.getElementById(e.pointerId)
    //   if (dot === null) return
    //   dot.remove()
    // })
  }
  function remove() {
    const dots = document.querySelectorAll('.dot')
    dots.forEach(dot => { dot.remove() })
  }


  return (
    <>

      <div onClick={startDrawing} className='topHalf'></div>
      <div className='relative'>
        <button onClick={remove} className="p-2 border-2 absolute left-[50%] translate-x-[-50%] top-2 border-[#333] hover:border-[#fff] rounded-md bg-white hover:bg-[#333] text-[#333] hover:text-white">Clear</button>
      </div>
    </>
  )
}

export default App
