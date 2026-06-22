-- CreateTable
CREATE TABLE "ResumeRaw" (
    "id" SERIAL NOT NULL,
    "raw_text" TEXT NOT NULL,
    "resume_id" INTEGER NOT NULL,

    CONSTRAINT "ResumeRaw_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ResumeRaw" ADD CONSTRAINT "ResumeRaw_resume_id_fkey" FOREIGN KEY ("resume_id") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
