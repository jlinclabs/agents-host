/*
  Warnings:

  - The primary key for the `Notification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Notification` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Notification_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "DocumentEvent" (
    "id" SERIAL NOT NULL,
    "occuredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "documentId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "value" JSONB NOT NULL,

    CONSTRAINT "DocumentEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,
    "value" JSONB NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


-- apply DocumentEvent to Document
CREATE FUNCTION process_document_event()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $$
BEGIN
  INSERT INTO "Document" (
    "version",
    "createdAt",
    "updatedAt",
    "deletedAt",
    "id",
    "userId",
    "value"
  )
  VALUES (
    0,
    NEW."occuredAt",
    null,
    CASE when NEW.value IS NULL THEN NEW."occuredAt" ELSE null END,
    NEW."documentId",
    NEW."UserId",
    NEW."value"
  )
  ON CONFLICT (uid) DO UPDATE SET
    "version"="Document".version + 1,
    "updatedAt"=NEW."occuredAt",
    "deletedAt"=EXCLUDED."deletedAt",
    "value"=EXCLUDED."value"
  WHERE "Document"."id"=EXCLUDED."id";
  RETURN NULL;
END
$$;

CREATE TRIGGER document_event_inserted
AFTER INSERT ON "DocumentEvent"
FOR EACH ROW EXECUTE PROCEDURE process_document_event();