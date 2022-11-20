import './App.css'
import { useState, useEffect, useRef } from 'react'

function App() {
  const [pathCurrentVal, setPathCurrentVal] = useState("")
  const [elemants, setElemants] = useState(["M20 20 20 50"])
  const svgElement = useRef("")
  const [fireStatus, setFireStatus] = useState(false)

  useEffect(() => {
    svgElement.current.lastChild.setAttribute('d', pathCurrentVal)
  }, [pathCurrentVal,])

  function positionDot(e, dot) {
    dot.style.top = `${e.pageY}px`
    dot.style.left = `${e.pageX}px`
    dot.style.width = `${e.width * 10}px`
    dot.style.height = `${e.height * 10}px`
  }
  const pointerDown = (e) => {
    // const dot = document.createElement('div')
    // dot.classList.add('dot')
    // dot.id = e.pointerId
    // positionDot(e, dot)
    // e.target.appendChild(dot)
    const xCoordinate = e.clientX
    const yCoordinate = e.clientY
    setPathCurrentVal(pathCurrentVal + " " + xCoordinate + " " + yCoordinate)
    setFireStatus(true)
  }

  const pointerMove = (e) => {
    // const dot = document.getElementById(e.pointerId)
    // if (dot === null) return
    // positionDot(e, dot)
    //makes lines
    // const newDot = document.createElement('div')
    // newDot.classList.add('dot')
    // positionDot(e, newDot)
    // e.target.appendChild(newDot)
    //makes lines
    // console.log(e.button)
    if (fireStatus) {
      const xCoordinate = e.clientX
      const yCoordinate = e.clientY
      setPathCurrentVal(pathCurrentVal + " " + xCoordinate + " " + yCoordinate)
    }

    // continue in the same path
    if (!fireStatus) {
      const xCoordinate = e.clientX
      const yCoordinate = e.clientY
      setPathCurrentVal(pathCurrentVal + " M" + xCoordinate + " " + yCoordinate)

      if(pathCurrentVal.split(' ').slice(-2)[0].includes('M')) {
        const tempSlice = pathCurrentVal.split(' ')
        tempSlice.splice(-2,2)
        setPathCurrentVal(tempSlice.join(" ") + " M" + xCoordinate + " " + yCoordinate)
        // console.log(pathCurrentVal)
      }
    }

    //create new path element
    // in pointerUp function
  }

  const pointerUp = (e) => {
    // const dot = document.getElementById(e.pointerId)
    // if (dot === null) return
    // dot.remove()
    setFireStatus(false)
    //createing new path 
    // <path d="M20 20 306 160" fill="none" stroke="blue" stroke-width="5"></path>
    // const path = document.createElement('path')
    // path.setAttribute('stroke', 'white')
    // path.setAttribute('fill', 'none')
    // path.setAttribute('stroke-width', '3')
    // const xCoordinate = e.clientX
    // const yCoordinate = e.clientY
    // path.setAttribute('d', "M" + xCoordinate + " " + yCoordinate)
    // svgElement.current.appendChild(path)

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

  // function runOnce(e) {
  //   const { width, height } = e.target.getBoundingClientRect()
  //   console.log({ width, height })
  // }

  return (
    <>

      {/* <div onPointerDown={(e) => pointerDown(e)} onPointerMove={(e) => { pointerMove(e) }} onPointerUp={(e) => { pointerUp(e) }} onPointerCancel={(e) => { pointerCancel(e) }} className='topHalf'> */}
      <div onMouseDown={(e) => pointerDown(e)} onPointerMove={(e) => { pointerMove(e) }} onPointerUp={(e) => { pointerUp(e) }} className='topHalf'>
        <svg ref={svgElement} width="1500" height="500" xmlns="http://www.w3.org/2000/svg">
          {elemants.map((element,index)=>{return <path key={index} d={element} fill="none" stroke="white" strokeWidth="3"></path>})}
          {/* <path d="M20 20 306 160" fill="none" stroke="white" strokeWidth="3"></path> */}
        </svg>
      </div>
      <div className='relative'>
        <button onClick={remove} className="p-2 border-2 absolute left-[50%] translate-x-[-50%] top-2 border-[#333] hover:border-[#fff] rounded-md bg-white hover:bg-[#333] text-[#333] hover:text-white">Clear</button>
      </div>
    </>
  )
}

export default App
