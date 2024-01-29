import React from 'react'

type Props = {
    auction : any
}

export default function AuctionCard({auction} : Props) {
  return (
    <div>
        <div>{auction.make}</div>
    </div>
  )
}
