import React from 'react'
import { BiBookmarkAltPlus } from "react-icons/bi"

const Header = () => {
  return (
    <>
        <div className="bg-green-700 border-black border-2 flex flex-auto  text-center p-2">
            <div className="border-2 border-black rounded-full overflow-hidden p-1 bg-orange-200 hover:bg-orange-500 hover:scale-105"><BiBookmarkAltPlus size={104}/></div>
            <div className="p-1 m-1"><h1 className="text-8xl font-bold text-green-400">The Blog Wall...</h1></div>
        </div>
    </>
  )
}

export default Header