'use client'

import { useAuctionStore } from '@/hooks/useAuctionStore'
import { useBidStore } from '@/hooks/useBidStore'
import { Auction, AuctionFinished, Bid } from '@/types'
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { User } from 'next-auth'
import React, { ReactNode, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import AuctionCreatedToast from '../components/AuctionCreatedToast'
import { getDetaildViewData } from '../actions/AuctionActions'
import AuctionFinishedToast from '../components/AuctionFinishedToast'

type Props = {
    children : ReactNode,
    user : User | null
}

export default function SignalRProvider({children, user} : Props) {
    const [connection, setConnection] = useState<HubConnection | null>(null)
    const setCurrentPrice = useAuctionStore(state => state.setCurrentPrice)
    const addBid = useBidStore(state => state.addBid)
    const apiUrl = process.env.NODE_ENV === 'production' ? 'https://api.carties.com/notifications' : process.env.NEXT_PUBLIC_NOTIFY_URL

    useEffect(()=> {
        const newConnection = new HubConnectionBuilder()
                    .withUrl(apiUrl!)
                    .withAutomaticReconnect()
                    .build()

                setConnection(newConnection);

    }, [apiUrl])

    useEffect(()=> {
        if(connection){
            connection.start()
                .then(()=>{
                    console.log('Connected to notification hub');

                    connection.on('BidPlaced', (bid: Bid) => {
                        console.log('Bid placed event reveived')
                        if(bid.bidStatus.includes('Accepted')){
                            setCurrentPrice(bid.auctionId, bid.amount)
                        }
                        addBid(bid)
                    });

                    connection.on('Auction created', (auction: Auction) => {
                        console.log('Auction created Connected')
                        if(user?.username !== auction.seller){
                            return toast(<AuctionCreatedToast auction={auction}/>, {duration: 5000})
                        }
                    })

                    connection.on('Auction finished', (finishedAuction: AuctionFinished) => {
                        const auction = getDetaildViewData(finishedAuction.auctionId)
                         return toast.promise(auction , {
                            loading: 'Loading',
                            success: (auction) => <AuctionFinishedToast auction={auction} finishedAuction={finishedAuction}/>,
                            error: (err) => 'Auction finished'
                         },{ success: {duration: 5000, icon: null}})
                    })

                }).catch(error => console.log(error))
        }

        return () =>{
            connection?.stop();
        }
    }, [connection, setCurrentPrice, addBid, user?.username])

  return (
    children
  )
}
