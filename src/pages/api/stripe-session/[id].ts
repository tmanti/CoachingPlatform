import { env } from "../../../env/server.mjs";

import { NextApiRequest, NextApiResponse } from 'next'

import Stripe from 'stripe'
const stripe = new Stripe(env.STRIPE_SECRET, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2022-08-01',
})

import { prisma } from "../../../server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id: string = req.query.id as string
  try {
    if (!id.startsWith('cs_')) {
      throw Error('Incorrect CheckoutSession ID.')
    }
    const checkout_session: Stripe.Checkout.Session =
      await stripe.checkout.sessions.retrieve(id, {
        expand: ['payment_intent'],
      })
    //get start and desired from db or from checkout, db probably best way
    //maybe make some kind of footnote for begin transaction and update via result.
    //honestly we can just extract from this, user wont be able to interact with it at all and if we return and put in to state it will be fine.
    //dont wanna go to db at this point, seems unessary

    //console.log(checkout_session);
    
    const data = await prisma.pendingRequest.findFirst({
      where:{
        transaction_id:checkout_session.id
      },
      select:{
        start_rank:true,
        desired_rank:true
      }
    })

    if (!data || !checkout_session) {
      //console.log(data)
      //console.log(checkout_session)
      return res.status(404).json({ message: "transaction not found" });
    }

    res.status(200).json({
      session:checkout_session,
      start_rank:data?.start_rank,
      desired_rank:data?.desired_rank,
    })
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : 'Internal server error'
    res.status(500).json({ statusCode: 500, message: errorMessage })
  }
}
