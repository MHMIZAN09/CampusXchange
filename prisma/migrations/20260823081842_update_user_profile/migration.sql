/*
  Warnings:

  - Made the column `gender` on table `student_profiles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `university` on table `student_profiles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "student_profiles" ALTER COLUMN "gender" SET NOT NULL,
ALTER COLUMN "university" SET NOT NULL;
