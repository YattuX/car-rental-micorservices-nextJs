import Image from 'next/image'
import Listings from './auctions/Listings'

export default function Home() {
  return (
    <div>
      <h3 className="text text-3xl font-semibold">
        <Listings/>
      </h3>
    </div>
  )
}
