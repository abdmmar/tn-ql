-- CreateTable
CREATE TABLE "NationalPark" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "total_area" TEXT NOT NULL,
    "waters_percentages" TEXT,
    "region" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "map" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "established" TEXT NOT NULL,
    "visitors" TEXT NOT NULL,
    "management" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "link" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "width" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "date" DATETIME,
    "original_source" TEXT,
    "author" TEXT,
    "src" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "License" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT,
    "link" TEXT
);

-- CreateTable
CREATE TABLE "InternationalStatus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Coordinate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "nationalParkId" INTEGER NOT NULL,
    CONSTRAINT "Coordinate_nationalParkId_fkey" FOREIGN KEY ("nationalParkId") REFERENCES "NationalPark" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ImageToNationalPark" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "NationalPark" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_InternationalStatusToNationalPark" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "InternationalStatus" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "NationalPark" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ImageToLicense" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "License" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Coordinate_nationalParkId_key" ON "Coordinate"("nationalParkId");

-- CreateIndex
CREATE UNIQUE INDEX "_ImageToNationalPark_AB_unique" ON "_ImageToNationalPark"("A", "B");

-- CreateIndex
CREATE INDEX "_ImageToNationalPark_B_index" ON "_ImageToNationalPark"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InternationalStatusToNationalPark_AB_unique" ON "_InternationalStatusToNationalPark"("A", "B");

-- CreateIndex
CREATE INDEX "_InternationalStatusToNationalPark_B_index" ON "_InternationalStatusToNationalPark"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ImageToLicense_AB_unique" ON "_ImageToLicense"("A", "B");

-- CreateIndex
CREATE INDEX "_ImageToLicense_B_index" ON "_ImageToLicense"("B");
