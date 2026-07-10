-- CreateTable
CREATE TABLE "JobEmbedding" (
    "id" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "embedding" vector NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "job_id" INTEGER NOT NULL,

    CONSTRAINT "JobEmbedding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "JobEmbedding_job_id_idx" ON "JobEmbedding"("job_id");

-- AddForeignKey
ALTER TABLE "JobEmbedding" ADD CONSTRAINT "JobEmbedding_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
