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
import EmptyFilter from '../components/EmptyFilter'
import { useAuctionStore } from '@/hooks/useAuctionStore'


export default function Listings() {
  const [loading, setLoading] = useState(true);
  const params = useParamsStrore(state => ({
    pageNumber: state.pageNumber,
    pageSize: state.pageSize,
    searchTerm: state.searchTerm,
    orderBy: state.orderBy,
    filterBy: state.filterBy,
    seller: state.seller,
    winner: state.winner
  }), shallow)

  const data = useAuctionStore(state => ({
    auctions: state.auctions,
    totalCount: state.totalCount,
    pageCount: state.pageCount
  }))

  const setData = useAuctionStore(state => state.setData);
  const setParams = useParamsStrore(state => state.setParams)
  const url = qs.stringifyUrl({ url: '', query: params })

  function setPageNumber(pageNumber: number) {
    setParams({ pageNumber })
  }

  useEffect(() => {
    getData(url).then(data => {
      setData(data);
      setLoading(false);
    })
  }, [url,setData])

  if (loading) return (<h3>Loading...</h3>)

  if (data.totalCount === 0) return <EmptyFilter showReset />

  return (
    <>
      <Filters />
      <div className='grid grid-cols-4 gap-6'>
        {data.auctions.map((auction: any) => (
          <AuctionCard auction={auction} key={auction.id} />
        ))}
      </div>
      <div className='flex justify-center mt-4'>
        <AppPagination pageChanged={setPageNumber} currentPage={params.pageNumber} pageCount={data.pageCount} />
      </div>
    </>

  )
}
