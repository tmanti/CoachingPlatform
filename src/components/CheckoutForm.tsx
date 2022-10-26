import { useState } from "react";

import RankSelector from "../components/RankSelector";
import calculatePrice from "../utils/calc-price";
import { fetchPostJSON } from "../utils/api-utils";

import { trpc } from "../utils/trpc";

const CheckoutForm = () => {
    const [loading, setLoading] = useState(false);

    const [startRank, setStartRank] = useState(-1);
    const [endRank, setEndRank] = useState(-1);

    const [currentPrice, setPrice] = useState(-1);

    const transaction = trpc.transaction.createPendingTransaction.useMutation({
        onSuccess:(data)=>{
            if(data){
                window.location.href=data;
            }
        }
    })

    const update_price = (start: number, end:number) => {
        //console.log(start, end);
        if(start === -1 || end === -1 || start >= end){
            setPrice(-1);
        } else {
            const p = calculatePrice(start, end);
            console.log("Price: ", p);
            setPrice(p);
        }
    }

    const handleSubmit = async () =>{
        setLoading(true);
        if(startRank === -1 || endRank === -1 || startRank >= endRank){
            setLoading(false);
            return
        }
        try{
            const response = await fetchPostJSON('/api/stripe-session/create', {
                start_rank:startRank,
                desired_rank:endRank,
            })
            const id:string = response.id || null;
            if(id){
                transaction.mutate({
                    callback_url:response.url,
                    transaction_id:id,
                    start_rank:startRank,
                    desired_rank:endRank
                })
            } else {
                console.log("we shouldn't be here scotty, beam me out!");
                console.log(response);
            }
        } catch (e){
            console.log(e);
        }
        setLoading(false);
    }

    return (
        <>
            <div className="sm:flex">
            <div>
                <h2>Current Rank</h2>
                <RankSelector updateValue={(value:number)=>{
                    setStartRank(value);
                    update_price(value, endRank);
                }} />
            </div>
            <div>
                <h2>Desired Rank</h2>
                <RankSelector updateValue={(value:number)=>{ 
                    setEndRank(value);
                    update_price(startRank, value);
                }} />
            </div>
            </div>
            <br />
            <button
                type="button"
                onClick={()=>{handleSubmit()}}
                disabled={loading}
                className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            >
                Price: {currentPrice}
            </button>
        </>
    )
}

export default CheckoutForm;