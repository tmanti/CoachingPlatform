import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { authedProcedure, t } from "../../trpc";

export const userRouter = t.router({
    getAll: authedProcedure
        .query(async ({ ctx, input })=>{
            if(!ctx.session.user.permissions || ctx.session.user.permissions < 2) throw new TRPCError({ code: "UNAUTHORIZED" });

            return await ctx.prisma.user.findMany({
                select:{
                    id: true,
                    name:true,
                    image:true,
                    permissions:true,
                }
            })
        }),
    changePermissions: authedProcedure
        .input(
            z.object({
                user_id: z.string(),
                new_permissions: z.number()
            })    
        )
        .mutation(async ({ ctx, input })=>{

            const user = await ctx.prisma.user.findFirst({
                where:{
                    id:input.user_id
                },
                select:{
                    permissions:true
                }
            })

            if(!user) throw new TRPCError({code:"BAD_REQUEST"});

            if(!ctx.session.user.permissions || ctx.session.user.permissions < 2 || ctx.session.user.permissions <= input.new_permissions || user?.permissions >= ctx.session.user.permissions) throw new TRPCError({ code: "UNAUTHORIZED" });

            return await ctx.prisma.user.update({
                where:{
                    id:input.user_id
                },
                data:{
                    permissions:input.new_permissions
                }
            })
        }),
    setup: authedProcedure
        .mutation(async ({ ctx })=>{
            const owner = await ctx.prisma.user.findFirst({
                where:{
                    permissions:3
                },
                select:{
                    id:true,
                    name:true
                }
            })

            if(!owner){
                return await ctx.prisma.user.update({
                    where:{
                        id:ctx.session.user.id
                    },
                    data:{
                        permissions:3
                    }
                })
            }
        }),
    isSetup: authedProcedure
        .query(async ({ ctx })=>{
            const owner = await ctx.prisma.user.findFirst({
                where:{
                    permissions:3
                },
                select:{
                    id:true,
                    name:true
                }
            })

            return owner !== null
        })
})