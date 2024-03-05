"use client"

import { useParamsStrore } from '@/hooks/useParamsStore'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { FaCar } from 'react-icons/fa'

export default function Logo() {
    const router = useRouter()
    const pathName = usePathname()
    const reset = useParamsStrore(state => state.reset)

    function doReset() {
        if(pathName !=='/') router.push('/');
        reset();
    }

  return (
    <div onClick={doReset} className='flex items-center gap-2 text-teal-600 text-xl cursor-pointer'>
        <FaCar size={34} />
        <div>Carties Auctions</div>
    </div>
  )
}
