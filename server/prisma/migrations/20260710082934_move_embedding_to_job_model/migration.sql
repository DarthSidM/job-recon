/*
  Warnings:

  - You are about to drop the `JobEmbedding` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "JobEmbedding" DROP CONSTRAINT "JobEmbedding_job_id_fkey";

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "embedding" vector,
ADD COLUMN     "model" TEXT;

-- DropTable
DROP TABLE "JobEmbedding";
