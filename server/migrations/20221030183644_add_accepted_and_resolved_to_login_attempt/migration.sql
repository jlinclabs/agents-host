-- AlterTable
ALTER TABLE "LoginAttempt" ADD COLUMN     "accepted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "resolved" BOOLEAN NOT NULL DEFAULT false;
