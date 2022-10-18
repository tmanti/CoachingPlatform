import { useState } from "react";

import RankSelector from "../components/RankSelector";
import calculatePrice from "../utils/calc-price";
import { fetchPostJSON } from "../utils/api-utils";


const CheckoutForm = () => {
    const [loading, setLoading] = useState(false);

    const [startRank, setStartRank] = useState(-1);
    const [endRank, setEndRank] = useState(-1);

    const [currentPrice, setPrice] = useState(-1);

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
        try{
            const response = await fetchPostJSON('/api/stripe-session/create', {
                start_rank:startRank,
                desired_rank:endRank,
            })
            console.log(response);
        } catch (e){
            console.log(e);
        }
        setLoading(false);
        //window.location.href=response.url;
    }

    return (
        <>
            <div className="sm:flex">
            <div>
                <h2>Current Rank</h2>
                <RankSelector updateValue={(value:number)=>{
                    setStartRank(value-1);
                    update_price(value-1, endRank);
                }} />
            </div>
            <div>
                <h2>Desired Rank</h2>
                <RankSelector updateValue={(value:number)=>{ 
                    setEndRank(value-1);
                    update_price(startRank, value-1);
                }} />
            </div>
            </div>
            <br />
            <button
                type="button"
                onClick={()=>{handleSubmit()}}
                disabled={loading}
            >
                Price: {currentPrice}
            </button>
        </>
    )
}

export default CheckoutForm;