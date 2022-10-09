import { t } from "../../trpc";
import { z } from "zod";

export const transactionRouter = t.router({
    completeTransaction: t.procedure //create request and initiate payment
        .input(
            z.object({
                transaction_id: z.string(),
                account_name: z.string(),
                account_pass: z.string(),
                start_rank: z.number(),
                desired_rank: z.number(),
            })
        )
        .mutation(async ({ ctx, input })=>{
            try{
                await ctx.prisma.request.create({
                    data:{
                        transaction_id:input.transaction_id,
                        account_name:input.account_name,
                        account_pass:input.account_pass,
                        start_rank:input.start_rank,
                        desired_rank:input.desired_rank,
                    }
                })
            } catch (error){
                console.log("error", error)
            }
        }),
    viewTransaction: t.procedure
        .input(
            z.object({
                transaction_id:z.string()
            })
        )
        .query(async ({ ctx, input })=>{
            return await ctx.prisma.request.findFirst({
                where:{
                    transaction_id:input.transaction_id,
                },
                select:{
                    account_name:true,
                    start_rank:true,
                    desired_rank:true,
                    notes:true,
                    status:true
                }
            })
        })
})