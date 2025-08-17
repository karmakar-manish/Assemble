/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `UserSchema` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."UserSchema" ADD COLUMN     "uid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "UserSchema_uid_key" ON "public"."UserSchema"("uid");
