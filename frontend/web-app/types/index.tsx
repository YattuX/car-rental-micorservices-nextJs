export type PagedResult<T> = {
    results: T[]
    pageCount: number
    totalCount: number
}

export type Auction = {
    reservePrice: number
    seller: string
    winner: any
    soldAmount: number
    currentHidhBid: number
    createAt: string
    updatedAt: string
    auctionEnd: string
    status: string
    make: string
    model: string
    year: number
    color: string
    mileage: number
    imageUrl: string
    id: string
  }
  