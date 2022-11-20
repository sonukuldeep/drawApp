import './App.css'
import { useState, useEffect, useRef, useId } from 'react'

function App() {
  const [pathCurrentVal, setPathCurrentVal] = useState("")
  const [elemants, setElemants] = useState([{'d':'M20 20 20 50', 'stroke': 'white', 'strokeWidth': '1', 'id': '1'}])
  const [fireStatus, setFireStatus] = useState(false)
  const [select, setSelect] = useState(false)
  const [currentSelect, setCurrentSelect] = useState('1')
  const [currentPathWidth, setCurrentPathWidth] = useState('1')
  const svgElement = useRef("")
  const svgLineSize = useRef("")
  const selectBtn = useRef("")

  //change last path d value
  useEffect(() => {
    if (!select)
      svgElement.current.lastChild.setAttribute('d', pathCurrentVal)  
  }, [pathCurrentVal,])

  //btn active toggle that changes color via css
  useEffect(() => {
    selectBtn.current.classList.toggle('active')    
  }, [select])

  //select element and do something
  useEffect(()=>{
    // console.log(currentSelect)
    
    document.getElementById(currentSelect).setAttribute('stroke-width', currentPathWidth)
  },[currentSelect,currentPathWidth])

  function positionDot(e, dot) {
    dot.style.top = `${e.pageY}px`
    dot.style.left = `${e.pageX}px`
    dot.style.width = `${e.width * 10}px`
    dot.style.height = `${e.height * 10}px`
  }
  const pointerDown = (e) => {

    const xCoordinate = e.clientX
    const yCoordinate = e.clientY
    setPathCurrentVal(pathCurrentVal + " " + xCoordinate + " " + yCoordinate)
    setFireStatus(true)
  }

  const pointerMove = (e) => {

    if (fireStatus) {
      const xCoordinate = e.clientX
      const yCoordinate = e.clientY
      setPathCurrentVal(pathCurrentVal + " " + xCoordinate + " " + yCoordinate)
    }

    if (!fireStatus) {
      const xCoordinate = e.clientX
      const yCoordinate = e.clientY
      setPathCurrentVal(pathCurrentVal + " M" + xCoordinate + " " + yCoordinate)

      if (pathCurrentVal.split(' ').slice(-2)[0].includes('M')) {
        const tempSlice = pathCurrentVal.split(' ')
        tempSlice.splice(-2, 2)
        setPathCurrentVal("M" + xCoordinate + " " + yCoordinate)

      }
    }

  }

  const pointerUp = (e) => {
    if (!select) {
      var randomID = Math.floor(Math.random()*16777215).toString(16)
      const pathProperties = {'d': 'M20 20','stroke': 'white', 'strokeWidth': '2', 'id': randomID}
      setElemants([...elemants, pathProperties])
    }
    setFireStatus(false)

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

      <div onMouseDown={(e) => pointerDown(e)} onPointerMove={(e) => { pointerMove(e) }} onPointerUp={(e) => { pointerUp(e) }} className='topHalf'>
        <svg ref={svgElement} width="1500" height="500" xmlns="http://www.w3.org/2000/svg">
          {elemants.map((element, index) => { return <path onClick={(e) => {if(select) setCurrentSelect(e.target.id) }} key={index} id={element.id} d={element.d} fill="none" stroke={element.stroke} strokeWidth={element.stroke}></path> })}
        </svg>
      </div>
      <div className='relative'>
        <div className="absolute left-[50%] translate-x-[-50%] top-2">

          <button className='p-2 border-2 m-2 border-[#333] hover:border-[#fff] rounded-md bg-white hover:bg-[#333] text-[#333] hover:text-white' onClick={remove}>Clear</button>
          <input ref={svgLineSize} className='p-2 border-2 m-2 outline-none border-[#333] rounded-md bg-white text-[#333] w-[100px]' placeholder='line size' onChange={(e) => setCurrentPathWidth(e.target.value)} type="number" min='1' max='5' />
          <button data-select='btn' ref={selectBtn} onClick={() => { setSelect(!select) }} className='p-2 border-2 m-2 border-[#333] rounded-md bg-white text-[#333]' >Select</button>
        </div>
      </div>
    </>
  )
}

export default App
