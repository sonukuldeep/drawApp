import './App.css'
import { useState, useEffect, useRef, useId } from 'react'
import Layout from './Components/Layout'

function App() {
  const [pathCurrentVal, setPathCurrentVal] = useState("")
  const [elemants, setElemants] = useState([{ 'd': 'M20 20 20 50', 'stroke': '#54b6a4', 'strokeWidth': '1', 'id': '1' }])
  const [fireStatus, setFireStatus] = useState(false)
  const [select, setSelect] = useState(false)
  const [currentSelect, setCurrentSelect] = useState('1')
  const [currentPathWidth, setCurrentPathWidth] = useState('1')
  const [color, setColor] = useState("#54b6a4")
  const svgElement = useRef("")
  const svgLineSize = useRef("")
  const selectBtn = useRef("")
  const onDevice = useRef({ 'mobile': false })

  //change last path d value
  useEffect(() => {
    if (!select)
      svgElement.current.lastChild?.setAttribute('d', pathCurrentVal)
  }, [pathCurrentVal,])

  //btn active toggle that changes color via css
  useEffect(() => {
    // selectBtn.current.classList.toggle('active')
    const selectingLastPath = document.getElementById(elemants[elemants.length - 1].id)
    selectingLastPath.setAttribute('stroke', color)
  }, [select, color])

  //select element and do something
  useEffect(() => {
    const selectingLastPath = document.getElementById(elemants[elemants.length - 1].id)
    selectingLastPath.setAttribute('stroke-width', currentPathWidth)
    // document.getElementById(currentSelect)?.setAttribute('stroke-width', currentPathWidth)
  }, [currentSelect, currentPathWidth])

  const deviceType = getDeviceType()
  if (deviceType === 'desktop') {

    onDevice.current.mobile = false
  }
  else if (deviceType === 'mobile') {

    onDevice.current.mobile = true
  }
  else {
    //probably on tablet
    onDevice.current.mobile = true

  }

  const touchUp = (e) => {


  }

  const touchDown = (e) => {


  }
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
    // console.log({x:e.pageX,y:e.pageY})

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
      const pathProperties = { 'd': 'M20 20', 'stroke': color, 'strokeWidth': currentPathWidth, 'id': randomID }
      setElemants([...elemants, pathProperties])
    }
    setFireStatus(false)
  }

  const pointerCancel = (e) => {

    if (!select) {
      var randomID = Math.floor(Math.random() * 16777215).toString(16)
      const pathProperties = { 'd': 'M20 20', 'stroke': color, 'strokeWidth': currentPathWidth, 'id': randomID }
      setElemants([...elemants, pathProperties])
    }
    setFireStatus(false)
  }

  function remove() {
    setElemants([{ 'd': 'M20 20', 'stroke': color, 'strokeWidth': '1', 'id': '1' }])
  }

  function lineWidth(width) {
    setCurrentPathWidth(width)
  }

  function selectLine() {
    console.log('select')
  }

  return (
    <>
      <Layout remove={remove} colorChange={setColor} selectLine={selectLine} width={currentPathWidth} lineWidth={lineWidth}>
        <div onPointerDown={(e) => onDevice.current.mobile ? touchDown(e) : pointerDown(e)} onPointerMove={(e) => { onDevice.current.mobile ? "" : pointerMove(e) }} onPointerUp={(e) => { onDevice.current.mobile ? touchUp(e) : pointerUp(e) }} draggable="false" className='bg-[#333] touch-none'>
          <svg ref={svgElement} xmlns="http://www.w3.org/2000/svg" className='h-[calc(100vh_-_140px)] w-full'>
            {elemants.map((element, index) => { return <path onClick={(e) => { if (select) setCurrentSelect(e.target.id) }} key={index} id={element.id} d={element.d} fill="none" stroke={element.stroke} strokeWidth={element.strokeWidth}></path> })}
          </svg>
        </div>
      </Layout>
    </>
  )
}

export default App


function getDeviceType() {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "mobile";
  }
  return "desktop";
};