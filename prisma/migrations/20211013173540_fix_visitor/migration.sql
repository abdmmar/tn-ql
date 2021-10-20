-- RedefineTables
PRAGMA foreign_keys=OFF;
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
    "established" TEXT,
    "visitors" TEXT,
    "management" TEXT
);
INSERT INTO "new_NationalPark" ("description", "established", "id", "link", "location", "management", "map", "name", "region", "visitors", "waters_percentages", "year") SELECT "description", "established", "id", "link", "location", "management", "map", "name", "region", "visitors", "waters_percentages", "year" FROM "NationalPark";
DROP TABLE "NationalPark";
ALTER TABLE "new_NationalPark" RENAME TO "NationalPark";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
