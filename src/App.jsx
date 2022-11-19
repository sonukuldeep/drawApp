import './App.css'

function App() {

  function positionDot(e, dot) {
    dot.style.top = `${e.pageY}px`
    dot.style.left = `${e.pageX}px`
    dot.style.width = `${e.width * 10}px`
    dot.style.height = `${e.height * 10}px`
  }

  const pointerDown = (e) => {
    const dot = document.createElement('div')
    dot.classList.add('dot')
    dot.id = e.pointerId
    positionDot(e, dot)
    e.target.appendChild(dot)

  }

  const pointerMove = (e) => {
    const dot = document.getElementById(e.pointerId)
    if (dot === null) return
    positionDot(e, dot)
    //makes lines
    const newDot = document.createElement('div')
    newDot.classList.add('dot')
    positionDot(e, newDot)
    e.target.appendChild(newDot)
    //makes lines
  }

  const pointerUp = (e) => {
    const dot = document.getElementById(e.pointerId)
    if (dot === null) return
    dot.remove()
  }

  const pointerCancel = (e) => {

    const dot = document.getElementById(e.pointerId)
    if (dot === null) return
    dot.remove()
  }

  function remove() {
    const dots = document.querySelectorAll('.dot')
    dots.forEach(dot => { dot.remove() })
  }


  return (
    <>

      <div onPointerDown={(e) => pointerDown(e)} onPointerMove={(e)=>{pointerMove(e)}} onPointerUp={(e)=>{pointerUp(e)}} onPointerCancel={(e)=>{pointerCancel(e)}} className='topHalf'></div>
      <div className='relative'>
        <button onClick={remove} className="p-2 border-2 absolute left-[50%] translate-x-[-50%] top-2 border-[#333] hover:border-[#fff] rounded-md bg-white hover:bg-[#333] text-[#333] hover:text-white">Clear</button>
      </div>
    </>
  )
}

export default App
