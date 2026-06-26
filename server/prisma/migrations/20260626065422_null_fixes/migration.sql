-- AlterTable
ALTER TABLE "ResumeEducation" ALTER COLUMN "start_date" DROP NOT NULL,
ALTER COLUMN "end_date" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ResumeExperience" ALTER COLUMN "start_date" DROP NOT NULL,
ALTER COLUMN "end_date" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ResumeProfile" ALTER COLUMN "phone" SET DATA TYPE TEXT,
ALTER COLUMN "summary" DROP NOT NULL;
