/*
  Warnings:

  - Added the required column `size` to the `Photos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Photos" ADD COLUMN     "size" INTEGER NOT NULL;
