import { useParamsStrore } from '@/hooks/useParamsStore'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

export default function Search() {
    const setParams = useParamsStrore(state => state.setParams);
    const [value, setValue] = useState('');

    function onChange(event: any){
        setValue(event.target.value)
    }

    function search(){
        setParams({searchTerm: value})
    }

  return (
    <div className='flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm'>
        <input  
            onKeyDown={(e:any)=>{
                if(e.key === 'Enter') search()
            }}
            onChange={onChange}
            type="text" className='flex-grow pl-5 bg-transparent focus:outline-none border-transparent focus:border-none focus:ring-0 text-sm '
        placeholder='Search for cars by make, model or color'
        />
        <button>
            <FaSearch size={33} className='bg-teal-600 text-white rounded-full p-2 cursor-pointer mx-2' />
        </button>
    </div>
  )
}
