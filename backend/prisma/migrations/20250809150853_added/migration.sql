/*
  Warnings:

  - You are about to drop the column `name` on the `UserSchema` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `UserSchema` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `UserSchema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullname` to the `UserSchema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `UserSchema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `UserSchema` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."UserSchema" DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "fullname" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "profilePicture" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserSchema_email_key" ON "public"."UserSchema"("email");
