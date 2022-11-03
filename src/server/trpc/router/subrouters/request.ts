import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { authedProcedure, t } from "../../trpc";

export const requestRouter = t.router({
    getAll: authedProcedure
    .input(
        z.object({
            status: z.string()
        }).nullable()
    )
    .query(async ({ ctx, input })=>{
        /*const user = await ctx.prisma.user.findFirst({
            where:{
                id:ctx.session.user.id
            },
            select:{
                permissions:true,
            }
        })

        if(user === null || user.permissions < 1) throw new TRPCError({ code: "UNAUTHORIZED" });*/

        let data;
        if(input){
            data = await ctx.prisma.request.findMany({
                where:{
                    status:input.status,
                },
                select:{
                    id:true,
                    transaction_id:true,
                    account_name:true,
                    start_rank:true,
                    desired_rank:true,
                    status:true,
                    notes:true,
                    handler_id:true
                }
            })
        } else {
            data = await ctx.prisma.request.findMany({
                select:{
                    id:true,
                    transaction_id:true,
                    account_name:true,
                    start_rank:true,
                    desired_rank:true,
                    status:true,
                    notes:true,
                    handler_id:true
                }
            })
        }
        return data;
    }),
    viewRequest:authedProcedure
    .input(z.object({
        id:z.string(),
    }))
    .query(async ({ ctx, input })=>{
        const user = await ctx.prisma.user.findFirst({
            where:{
                id:ctx.session.user.id
            },
            select:{
                permissions:true,
            }
        })

        if(user === null || user.permissions < 1) throw new TRPCError({ code: "UNAUTHORIZED" });

        return await ctx.prisma.request.findFirst({
            where:{
                id:input.id,
            }
        })
    }),
    handleRequest:authedProcedure
    .input(z.object({
        req_id:z.string(),
    }))
    .mutation(async ({ctx, input})=>{
        //TODO:
        //check permissions
        const user = await ctx.prisma.user.findFirst({
            where:{
                id:ctx.session.user.id
            },
            select:{
                permissions:true,
            }
        })

        if(user === null || user.permissions < 1) throw new TRPCError({ code: "UNAUTHORIZED" });
        
        //assign to handler position
        return await ctx.prisma.request.update({
            where:{
                id:input.req_id
            },
            data:{
                handler:{
                    connect:{
                        id:ctx.session.user.id,
                    }
                }
            }
        })
    }),
    updateStatus:authedProcedure
    .input(z.object({
        req_id:z.string(),
        new_status:z.string(),
        note:z.string().nullable(),
    }))
    .mutation(async ({ctx, input})=>{
        //TODO: 
        //check permissions
        const user = await ctx.prisma.user.findFirst({
            where:{
                id:ctx.session.user.id
            },
            select:{
                permissions:true,
            }
        })

        if(user === null || user.permissions < 1) throw new TRPCError({ code: "UNAUTHORIZED" });
        //update status and if note, update note
        if(input.note){
            return await ctx.prisma.request.update({
                where:{
                    id:input.req_id
                },
                data:{
                    status:input.new_status,
                    notes:input.note,
                }
            })
        } else {
            return await ctx.prisma.request.update({
                where:{
                    id:input.req_id,
                },
                data:{
                    status:input.new_status,
                }
            })
        }
    })
});