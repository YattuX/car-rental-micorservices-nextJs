import React from 'react'
import { FaCar } from "react-icons/fa";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 flex justify-between bg-white p-5 items-center text-gray-800 shadow-md">
        <div  className='flex items-center font-semibold gap-2 text-teal-600 '>
            <FaCar size={34}/>
            <div>Carties Auctions</div>
        </div>
        <div>Search</div>
        <div>Login</div>
    </header>
  )
}
