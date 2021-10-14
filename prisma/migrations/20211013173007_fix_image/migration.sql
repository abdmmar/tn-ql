/*
  Warnings:

  - You are about to alter the column `height` on the `Image` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `width` on the `Image` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to drop the column `total_area` on the `NationalPark` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "TotalArea" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "km" INTEGER NOT NULL,
    "miles" INTEGER NOT NULL,
    "nationalParkId" INTEGER NOT NULL,
    CONSTRAINT "TotalArea_nationalParkId_fkey" FOREIGN KEY ("nationalParkId") REFERENCES "NationalPark" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "link" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "date" DATETIME,
    "original_source" TEXT,
    "author" TEXT,
    "src" TEXT NOT NULL
);
INSERT INTO "new_Image" ("author", "date", "height", "id", "link", "original_source", "size", "src", "title", "type", "width") SELECT "author", "date", "height", "id", "link", "original_source", "size", "src", "title", "type", "width" FROM "Image";
DROP TABLE "Image";
ALTER TABLE "new_Image" RENAME TO "Image";
CREATE TABLE "new_NationalPark" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "waters_percentages" TEXT,
    "region" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "map" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "established" TEXT NOT NULL,
    "visitors" TEXT NOT NULL,
    "management" TEXT NOT NULL
);
INSERT INTO "new_NationalPark" ("description", "established", "id", "link", "location", "management", "map", "name", "region", "visitors", "waters_percentages", "year") SELECT "description", "established", "id", "link", "location", "management", "map", "name", "region", "visitors", "waters_percentages", "year" FROM "NationalPark";
DROP TABLE "NationalPark";
ALTER TABLE "new_NationalPark" RENAME TO "NationalPark";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "TotalArea_nationalParkId_key" ON "TotalArea"("nationalParkId");
