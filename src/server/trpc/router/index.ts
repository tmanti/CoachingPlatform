// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { transactionRouter } from "./transaction";

export const appRouter = t.router({
  example: transactionRouter,
  //auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
