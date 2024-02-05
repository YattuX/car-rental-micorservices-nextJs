import React from 'react'
import { FaCar } from "react-icons/fa";
import Search from './Search';

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 flex justify-between bg-white p-5 items-center text-gray-800 shadow-md  font-semibold">
      <div className='flex items-center gap-2 text-teal-600 text-xl'>
        <FaCar size={34} />
        <div>Carties Auctions</div>
      </div>
      <Search/>
      <div>Login</div>
    </header>
  )
}
