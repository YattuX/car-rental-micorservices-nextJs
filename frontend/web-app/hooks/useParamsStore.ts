import { create } from "zustand"


type State = {
    pageNumber : number
    pageSize : number
    pageCount : number
    searchTerm : string
}

type Auctions = {
    setParams : (params : Partial<State>) => void
    reset: () => void
}

const initialState : State = {
    pageNumber : 1,
    pageSize: 12,
    pageCount: 1,
    searchTerm: ''
}

export const useParamsStrore = create<State & Auctions>()((set) => ({
    ...initialState,

    setParams: (newParams: Partial<State>) => {
        set((state)=>{
            if(newParams.pageNumber){
                return{...state, pageNumber: newParams.pageNumber}
            }else{
                return {...state, ...newParams, pageNumber: 1}
            }
        })
    },

    reset: () => {initialState}
}))