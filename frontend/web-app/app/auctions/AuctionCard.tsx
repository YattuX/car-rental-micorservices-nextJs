import React from 'react'
import CountdownTimer from './CountdownTimer'
import CarImage from './CarImage'
import Link from 'next/link'

type Props = {
  auction: any
}

export default function AuctionCard({ auction }: Props) {
  return (
    <Link href={`/auctions/details/${auction.id}`} className='group'>
      <div className='w-full bg-gray-200 aspect-w-16 aspect-h-10 rounded-lg overflow-hidden' >
        <div>
          <CarImage imageUrl={auction.imageUrl}/>
          <div className='absolute bottom-2 left-2'>
            <CountdownTimer auctionEnd={auction.auctionEnd}/>
          </div>
        </div>
      </div>
      <div className='flex justify-between items-center mt-4'>
            <h3 className='text-gray-700 text-sm'>{auction.make} {auction.model}</h3>
            <p className='font-bold text-sm'>{auction.year}</p>
      </div>
     
    </Link>
  )
}
