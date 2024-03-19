'use server'

import { Auction, PagedResult } from "@/types"
import { getTokenWorkaround } from "./authActions"
import { fetchWrapper } from "../lib/fetchWrapper"
import { FieldValues } from "react-hook-form"
import { revalidatePath } from "next/cache"


export async function getData(query: string) : Promise<PagedResult<Auction>>{
    return await fetchWrapper.get(`search${query}`)

}

export async function UpdateAuctionTest(){
    const data = {
        mileage : Math.floor(Math.random() * 100000) + 1
    }

    return await fetchWrapper.put('auctions/155225c1-4448-4066-9886-6786536e05ea', data)
}

export async function createAuction(data: FieldValues){
    return await fetchWrapper.post('auctions', data)
}

export async function getDetaildViewData(id: string): Promise<Auction>{
    return await fetchWrapper.get(`auctions/${id}`)
}

export async function updateAuction(data: FieldValues, id: string){
    const res = await fetchWrapper.put(`auctions/${id}`, data)
    revalidatePath(`auctions/${id}`)
    return res;
}

export async function deleteAuction(id: string){
    const res = await fetchWrapper.del(`auctions/${id}`)
    revalidatePath(`auctions/${id}`)
    return res;
}

export async function getBidsForAuction(id:string): Promise<any> {
    return await fetchWrapper.get(`bids/${id}`);
}

export async function placeBidForAuction(auctionId: string, amount:number){
    return await fetchWrapper.post(`bids?auctionId=${auctionId}&amount=${amount}`, {})
}
