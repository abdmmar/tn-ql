/*
  Warnings:

  - You are about to drop the column `status` on the `InternationalStatus` table. All the data in the column will be lost.
  - You are about to alter the column `latitude` on the `Coordinate` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.
  - You are about to alter the column `longitude` on the `Coordinate` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.
  - Added the required column `link` to the `InternationalStatus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `InternationalStatus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "License" ADD COLUMN "name" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InternationalStatus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL
);
INSERT INTO "new_InternationalStatus" ("id") SELECT "id" FROM "InternationalStatus";
DROP TABLE "InternationalStatus";
ALTER TABLE "new_InternationalStatus" RENAME TO "InternationalStatus";
CREATE TABLE "new_Coordinate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "nationalParkId" INTEGER NOT NULL,
    CONSTRAINT "Coordinate_nationalParkId_fkey" FOREIGN KEY ("nationalParkId") REFERENCES "NationalPark" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Coordinate" ("id", "latitude", "longitude", "nationalParkId") SELECT "id", "latitude", "longitude", "nationalParkId" FROM "Coordinate";
DROP TABLE "Coordinate";
ALTER TABLE "new_Coordinate" RENAME TO "Coordinate";
CREATE UNIQUE INDEX "Coordinate_nationalParkId_key" ON "Coordinate"("nationalParkId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
