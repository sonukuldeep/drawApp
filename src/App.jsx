import './App.css'

function App() {
  document.addEventListener('touchstart', e => {
    [...e.changedTouches].forEach(touch => {
      const dot = document.createElement('div')
      dot.classList.add('dot')
      dot.style.top = `${touch.pageY}px`
      dot.style.left = `${touch.pageX}px`
      dot.id = touch.identifier
      document.body.append(dot)
    })
  })

  function remove() {
    const dots = document.querySelectorAll('.dot')
    dots.forEach(dot => { dot.remove() })
  }
  return (
    <>

      <div className='topHalf'></div>
      <div className='relative'>
        <button onClick={remove} className="p-2 border-2 absolute left-[50%] translate-x-[-50%] top-2 border-[#333] hover:border-[#fff] rounded-md bg-white hover:bg-[#333] text-[#333] hover:text-white">Clear</button>
      </div>
    </>
  )
}

export default App
