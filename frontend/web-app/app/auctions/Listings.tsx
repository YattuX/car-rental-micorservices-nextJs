'use client'

import React, { useEffect, useState } from 'react'
import AuctionCard from './AuctionCard'
import AppPagination from '../components/AppPagination'
import { getData } from '../actions/AuctionActions'
import { Auction, PagedResult } from '@/types'
import Filters from './Filters'
import { pages } from 'next/dist/build/templates/app-page'
import { useParamsStrore } from '@/hooks/useParamsStore'
import { shallow } from 'zustand/shallow'
import qs from 'query-string'


export default function Listings() {
  const [data, setData] = useState<PagedResult<Auction>>();
  const params = useParamsStrore(state => ({
    pageNumber: state.pageNumber,
    pageSize : state.pageSize,
    pageCount : state.pageCount
  }), shallow)
  const setParams = useParamsStrore(state => state.setParams)
  const url = qs.stringifyUrl({url: '', query:params})
    // const [auctions, setAuctions] = useState<Auction[]>([])
    // const [pageCount, setPageCount] = useState(0)
    // const [pageNumber, setPageNumber] = useState(1)
    // const [pageSize, setPageSize] = useState(4)

    function setPageNumber(pageNumber: number){
      setParams({pageNumber})
    }

    useEffect(()=>{
      getData(url).then(data => {
        setData(data)
      })
    }, [url])

    if (!data) return (<h3>Loading...</h3>)

  return (
    <>
    <Filters/>
      <div className='grid grid-cols-4 gap-6'>
          {data.results.map((auction:any)=>(
              <AuctionCard auction={auction} key={auction.id}/>
          ))}
      </div>
      <div className='flex justify-center mt-4'>
        <AppPagination pageChanged={setPageNumber} currentPage={params.pageNumber} pageCount={data.pageCount}/>
      </div>
    </>
    
  )
}
