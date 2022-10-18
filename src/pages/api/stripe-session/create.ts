// src/pages/api/examples.ts
import { env } from "../../../env/server.mjs";

import type { NextApiRequest, NextApiResponse } from "next";

import Stripe from 'stripe';
const stripe = new Stripe(env.STRIPE_SECRET, {
    apiVersion: "2022-08-01",
});

import calculatePrice from "../../../utils/calc-price";
 
interface request {
    start_rank:number,
    desired_rank:number,
}

const validateRequest = (params : any): request | null => {
    const start = params.start_rank;
    const desired = params.desired_rank;

    //validate start, desired, account
    let valid = true;
    
    let result : request | null = null;
    
    if(valid){
        result =  {
            start_rank: start,
            desired_rank: desired,
        }
    }

    return result;
}

const create_stripe_session = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'POST'){
        try {
            const details : request | null = validateRequest(req.body);
            if(details){
                const price = calculatePrice(details.start_rank, details.desired_rank);
                console.log(price);
                if(price == -1) res.status(400).end('Invalid Request')
                const params : Stripe.Checkout.SessionCreateParams = {
                    mode:"payment",

                    success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: `${req.headers.origin}`,

                    line_items:[
                        {
                            price_data:{
                                currency:'cad',
                                product_data:{
                                    name: "Valorant Boosting Service",
                                    description: `rank boosting from rank ${details.start_rank} to ${details.desired_rank}`,
                                },
                                unit_amount:price*100,
                            },
                            quantity:1,
                        }
                    ]
                }

                //
                const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params);
                
                res.status(200).json(session);
            } else {
                res.status(400).end('Invalid Request')
            }
        } catch(err){
            //console.log(err);
            const errormsg = err instanceof Error ? err.message : 'Internal server error';
            res.status(500).json({
                message: errormsg
            });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
};

export default create_stripe_session;
