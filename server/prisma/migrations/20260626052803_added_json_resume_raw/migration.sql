/*
  Warnings:

  - Changed the type of `raw_text` on the `ResumeRaw` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ResumeRaw" DROP COLUMN "raw_text",
ADD COLUMN     "raw_text" JSONB NOT NULL;
