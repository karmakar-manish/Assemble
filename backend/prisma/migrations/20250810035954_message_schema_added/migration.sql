-- CreateTable
CREATE TABLE "public"."MessageSchema" (
    "id" SERIAL NOT NULL,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MessageSchema_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."MessageSchema" ADD CONSTRAINT "MessageSchema_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "public"."UserSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MessageSchema" ADD CONSTRAINT "MessageSchema_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "public"."UserSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
