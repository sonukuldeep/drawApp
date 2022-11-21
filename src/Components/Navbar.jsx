import React from 'react'
import logo from '../assets/images/logo.png'

const Navbar = ({ remove, colorChange, lineWidth, selectLine }) => {
    return (
        <header className="bg-gradient-to-r from-[#5cbf96] to-[#49aab7] lg:py-4">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <nav className="hidden relative lg:flex items-center justify-between h-1 bg-white lg:rounded-md lg:shadow-lg lg:h-2 lg:px-8 lg:py-6">
                    <div className="hidden flex-shrink-0 lg:block">
                        <img className="w-auto h-8 lg:h-10" src={logo} alt="Logo" />
                    </div>

                    <div className="hidden ml-10 lg:flex lg:items-center lg:mr-auto lg:space-x-10">
                        <div onClick={() => { lineWidth() }} className="text-base font-medium text-[#515a6e] transition-all duration-200 hover:text-[#ea7e5a]"> Pencil </div>

                        <div onClick={() => { remove() }} className="text-base font-medium text-[#515a6e] transition-all duration-200 hover:text-[#ea7e5a]"> Eraser </div>

                        <div onClick={() => { selectLine() }} className="text-base font-medium text-[#515a6e] transition-all duration-200 hover:text-[#ea7e5a]"> Select </div>

                        <div onClick={() => { colorChange() }} className="text-base font-medium text-[#515a6e] transition-all duration-200 hover:text-[#ea7e5a]"> Color </div>
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