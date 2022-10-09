// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { transactionRouter } from "./subrouters/transaction";
import { requestRouter } from "./subrouters/request";

export const appRouter = t.router({
  transaction: transactionRouter,
  request: requestRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
