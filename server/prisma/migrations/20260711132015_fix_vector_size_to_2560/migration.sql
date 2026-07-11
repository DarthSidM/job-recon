CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE "Job"
ALTER COLUMN "embedding"
TYPE vector(1560);

DROP INDEX IF EXISTS "Job_embedding_hnsw_idx";

CREATE INDEX "Job_embedding_hnsw_idx"
ON "Job"
USING hnsw ("embedding" vector_cosine_ops);