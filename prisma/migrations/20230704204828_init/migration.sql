-- CreateTable
CREATE TABLE "Photos" (
    "uuid" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Photos_uuid_key" ON "Photos"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Photos_url_key" ON "Photos"("url");
