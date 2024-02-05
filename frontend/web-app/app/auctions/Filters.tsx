import { useParamsStrore } from '@/hooks/useParamsStore';
import { Button } from 'flowbite-react';
import {AiOutlineClockCircle, AiOutlineSortAscending} from 'react-icons/ai'
import {BsFillStopCircleFill, BsStopwatchFill} from 'react-icons/bs'
import {GiFinishLine, GiFlame} from 'react-icons/gi'

import { ButtonGroup } from 'flowbite-react/lib/esm/components/Button/ButtonGroup';
import React from 'react'

type Props = {
    pageSize:number;
    setPageSize: (size: number) => void;
}

const pageSizeButtons = [4,8,12]

const orderButtons = [
    {
        label : 'Alphabetical',
        icon : AiOutlineSortAscending,
        value: 'make' 
    },
    {
        label: 'End date',
        icon: AiOutlineClockCircle,
        value: 'endingSoon'
    },
    {
        label: 'Recently added',
        icon: BsFillStopCircleFill,
        value: 'new'
    }

]

const filterButtons = [
    {
        label : 'Live Auctions',
        icon : GiFlame,
        value: 'live' 
    },
    {
        label: 'Ending < 6 hours',
        icon: GiFinishLine,
        value: 'endingSoon'
    },
    {
        label: 'Completed',
        icon: BsStopwatchFill,
        value: 'finished'
    }

]

export default function Filters() {
    const pageSize = useParamsStrore(state => state.pageSize)
    const setParams = useParamsStrore(state => state.setParams)
    const orderBy = useParamsStrore(state => state.orderBy);
    const filterBy = useParamsStrore(state => state.filterBy);

  return (
    <div className='flex justify-between items-center mb-4'>
        <div>
            <span className='uppercase text-sm text-gray-500 mr-2'>Filter BY</span>
            <Button.Group>
                {filterButtons.map(({label, icon: Icon, value}) => (
                    <Button
                        key={value}
                        onClick={()=>setParams({filterBy: value})}
                        color={`${filterBy === value ? 'red' : 'gray'}`}
                        
                    >
                        <Icon className='mr-3 h-4 w-4'/>
                        {label}
                    </Button>
                ))}
            </Button.Group>
        </div>

        <div>
            <span className='uppercase text-sm text-gray-500 mr-2'>ORDER BY</span>
            <Button.Group>
                {orderButtons.map(({label, icon: Icon, value}) => (
                    <Button
                        key={value}
                        onClick={()=>setParams({orderBy: value})}
                        color={`${orderBy === value ? 'red' : 'gray'}`}
                        
                    >
                        <Icon className='mr-3 h-4 w-4'/>
                        {label}
                    </Button>
                ))}
            </Button.Group>
        </div>

        <div>
            <span className='uppercase text-sm text-gray-500 mr-2'>Page Size</span>
            <ButtonGroup>
                {pageSizeButtons.map((value, i)=> (
                    <Button key={i}
                            onClick={()=> setParams({pageSize: value})}
                            color={`${pageSize === value ? 'red' : 'gray'}`}
                            className='focus:ring-0'>
                        {value}
                    </Button>
                ))}
            </ButtonGroup>
        </div>
    </div>
  )
}
