/*
  Warnings:

  - Made the column `account_pass` on table `Request` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "notes" STRING;
ALTER TABLE "Request" ALTER COLUMN "account_pass" SET NOT NULL;
ALTER TABLE "Request" ALTER COLUMN "status" SET DEFAULT 'created';
