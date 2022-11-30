import React, {useState, useEffect} from 'react'
import logo from '../assets/images/logo.png'

const Navbar = ({ remove, colorChange, lineWidth, selectLine, width }) => {
    const [lineW, setLineW] = useState(["text-[#ea7e5a]","text-[#ea7e5a]","text-[#ea7e5a]","text-[#ea7e5a]"]) 
    useEffect(()=>{
        const newLineWidth = ["text-[#ea7e5a]","text-[#ea7e5a]","text-[#ea7e5a]","text-[#ea7e5a]"]
        newLineWidth[width-1] = "text-[#5cbf96]"
        setLineW(newLineWidth)
        // console.log(lineW)
    },[width])

    return (
        <header className="bg-gradient-to-r from-[#5cbf96] to-[#49aab7] lg:py-4 text-white">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <nav className="hidden relative lg:flex items-center justify-between h-1 bg-white lg:rounded-md lg:shadow-lg lg:h-2 lg:px-8 lg:py-6">
                    <div className="hidden flex-shrink-0 lg:block">
                        <img className="w-auto h-8 lg:h-10" src={logo} alt="Logo" />
                    </div>

                    <div className="hidden ml-10 lg:flex lg:items-center lg:mr-auto lg:space-x-10">
                        <div className="text-base font-semibold text-[#515a6e] transition-all duration-200 hover:text-[#ea7e5a] flex justify-center gap-1">
                            <span className='p-1 self-center'>Pencil</span>
                            <span onClick={() => { lineWidth(1) }} className={`font-semibold ${lineW[0]} p-1 self-center hover:cursor-pointer`}>|</span>
                            <span onClick={() => { lineWidth(2) }} className={`font-bold ${lineW[1]} p-1 self-center hover:cursor-pointer`}>|</span>
                            <span onClick={() => { lineWidth(3) }} className={`font-bold ${lineW[2]} p-1 self-center text-xl hover:cursor-pointer`}>|</span>
                            <span onClick={() => { lineWidth(4) }} className={`font-bold ${lineW[3]} p-1 self-center text-3xl hover:cursor-pointer`}>|</span>
                        </div>
                        {/* <div onClick={() => { lineWidth() }} className="text-base font-semibold text-[#515a6e] transition-all duration-200 hover:text-[#ea7e5a] hover:cursor-pointer"> Pencil </div> */}

                        <div onClick={() => { remove() }} className="text-base font-semibold text-[#515a6e] transition-all duration-200 hover:text-[#ea7e5a] hover:cursor-pointer"> Eraser All </div>

                        <div onClick={() => { selectLine() }} className="text-base font-semibold text-[#515a6e] transition-all duration-200 hover:text-[#ea7e5a] hover:cursor-pointer"> Select </div>

                        {/* <div onClick={() => { colorChange() }} className="text-base font-semibold text-[#515a6e] transition-all duration-200 hover:text-[#ea7e5a] hover:cursor-pointer"> Color </div> */}
                        <div className="text-base font-semibold text-[#515a6e] transition-all duration-200 hover:text-[#ea7e5a] hover:cursor-pointer flex justify-center align-center"><span className='p-1'>Color</span><div className="w-8 h-8 rounded-full overflow-hidden"><input type="color" defaultValue="#54b6a4" onChange={e => colorChange(e.target.value)} /></div></div>

                    </div>

                </nav>

                <nav className="flex flex-row py-1 rounded-md lg:hidden">

                    <div className='flex justify-center items-center px-2 bg-[rgba(255,255,255,0.5)] pl-5 rounded-l-lg'>
                        <img className="w-auto h-8 lg:h-10" src={logo} alt="Logo" />
                        <div className='px-2'>
                            <div className="text-lg font-semibold text-[#515a6e] transition-all duration-200"> Pencil </div>
                            <div className="text-lg font-semibold text-[#515a6e] transition-all duration-200"> Eraser </div>
                        </div>

                    </div>
                    <div className='px-2 bg-[rgba(255,255,255,0.5)] pr-[40%] sm:pr-[75%] rounded-r-lg'>
                        <div className="text-lg font-semibold text-[#515a6e] transition-all duration-200"> Select </div>

                        <div className="text-lg font-semibold text-[#515a6e] transition-all duration-200"> Color  </div>
                    </div>


                </nav>
            </div>
        </header>

    )
}

export default Navbar