'use client'

import { useParamsStrore } from '@/hooks/useParamsStore'
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

export default function Search() {
    const router = useRouter();
    const pathName = usePathname();
    const setParams = useParamsStrore(state => state.setParams);
    const setSearchValue = useParamsStrore( state => state.setSearchValue)
    const searchValue = useParamsStrore( state => state.searchValue)

    function onChange(event: any){
        setSearchValue(event.target.value)
    }

    function search(){
        if(pathName !== '/') router.push('/')
        setParams({searchTerm: searchValue})
    }

  return (
    <div className='flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm'>
        <input  
            onKeyDown={(e:any)=>{
                if(e.key === 'Enter'){ search()}
            }}
            onChange={onChange}
            type="text" className='input-custom text-sm '
        placeholder='Search for cars by make, model or color'
        />
        <button onClick={search}>
            <FaSearch size={33} className='bg-teal-600 text-white rounded-full p-2 cursor-pointer mx-2' />
        </button>
    </div>
  )
}
