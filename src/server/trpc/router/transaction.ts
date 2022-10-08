import { t } from "../trpc";
import { z } from "zod";

export const transactionRouter = t.router({
    createTransaction: t.procedure //create request and initiate payment
        .input(
            z.object({
                initial_rank: z.string(),
                end_rank: z.string(),
                account_name: z.string(),
            })
        )
        .mutation(({ input })=>{

        }),
    viewTransaction: t.procedure
        .input(
            z.object({
                transaction_id:z.string()
            })
        )
        .query(({ ctx, input })=>{
            
        })
})