-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('GB2', 'MB500');

-- CreateTable
CREATE TABLE "Photos" (
    "uuid" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "publicId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "plan" "Plan" NOT NULL DEFAULT 'MB500'
);

-- CreateIndex
CREATE UNIQUE INDEX "Photos_uuid_key" ON "Photos"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Photos_url_key" ON "Photos"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Photos_publicId_key" ON "Photos"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Photos" ADD CONSTRAINT "Photos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
