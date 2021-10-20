/*
  Warnings:

  - A unique constraint covering the columns `[link]` on the table `InternationalStatus` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[type]` on the table `License` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "InternationalStatus_link_key" ON "InternationalStatus"("link");

-- CreateIndex
CREATE UNIQUE INDEX "License_type_key" ON "License"("type");
