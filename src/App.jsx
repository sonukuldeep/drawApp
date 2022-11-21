import './App.css'
import { useState, useEffect, useRef, useId } from 'react'
import Layout from './Components/Layout'

function App() {
  const [pathCurrentVal, setPathCurrentVal] = useState("")
  const [elemants, setElemants] = useState([{ 'd': 'M20 20 20 50', 'stroke': 'white', 'strokeWidth': '1', 'id': '1' }])
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
    // selectBtn.current.classList.toggle('active')
  }, [select])

  //select element and do something
  useEffect(() => {
    // console.log(currentSelect)

    document.getElementById(currentSelect).setAttribute('stroke-width', currentPathWidth)
  }, [currentSelect, currentPathWidth])

  const pointerDown = (e) => {
    
    const xCoordinate = e.pageX
    const yCoordinate = e.pageY - 80
    setPathCurrentVal(pathCurrentVal + " " + xCoordinate + " " + yCoordinate)
    setFireStatus(true)
  }
  
  const pointerMove = (e) => {
    
    if (fireStatus) {
      const xCoordinate = e.pageX
      const yCoordinate = e.pageY - 80
      setPathCurrentVal(pathCurrentVal + " " + xCoordinate + " " + yCoordinate)
    }
    
    if (!fireStatus) {
      const xCoordinate = e.pageX
      const yCoordinate = e.pageY - 80
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
      var randomID = Math.floor(Math.random() * 16777215).toString(16)
      const pathProperties = { 'd': 'M20 20', 'stroke': 'white', 'strokeWidth': '2', 'id': randomID }
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
    console.log('remove')
  }
  
  function colorChange() {
    console.log('change color')
  }
  
  function lineWidth() {
    console.log('line width')
  }

  function selectLine() {
    console.log('select')
  }
  
  return (
    <>
      <Layout remove={remove} colorChange={colorChange} selectLine={selectLine} lineWidth={lineWidth}>
        <div onMouseDown={(e) => pointerDown(e)} onPointerMove={(e) => { pointerMove(e) }} onPointerUp={(e) => { pointerUp(e) }} className='bg-[#333] touch-none'>
          <svg ref={svgElement} xmlns="http://www.w3.org/2000/svg" className='h-[calc(100vh_-_140px)] w-full'>
            {elemants.map((element, index) => { return <path onClick={(e) => { if (select) setCurrentSelect(e.target.id) }} key={index} id={element.id} d={element.d} fill="none" stroke={element.stroke} strokeWidth={element.stroke}></path> })}
          </svg>
        </div>
      </Layout>
    </>
  )
}

export default App
