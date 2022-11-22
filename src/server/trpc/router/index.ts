// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { transactionRouter } from "./subrouters/transaction";
import { requestRouter } from "./subrouters/request";
import { userRouter } from "./subrouters/user";

export const appRouter = t.router({
  transaction: transactionRouter,
  request: requestRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
