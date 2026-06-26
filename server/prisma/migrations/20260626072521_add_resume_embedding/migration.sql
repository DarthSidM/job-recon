CREATE EXTENSION IF NOT EXISTS vector;
-- CreateTable
CREATE TABLE "ResumeEmbedding" (
    "id" SERIAL NOT NULL,
    "embedding_type" TEXT NOT NULL,
    "embedding" vector(768) NOT NULL,
    "model_name" TEXT NOT NULL,
    "resume_id" INTEGER NOT NULL,

    CONSTRAINT "ResumeEmbedding_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ResumeEmbedding" ADD CONSTRAINT "ResumeEmbedding_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE INDEX "ResumeEmbedding_resume_id_idx"
ON "ResumeEmbedding"("resume_id");