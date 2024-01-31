/*
  Warnings:

  - Added the required column `lastInfo` to the `oltFound` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_oltFound" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "OltName" TEXT NOT NULL,
    "Armario" TEXT NOT NULL,
    "PowerdB" TEXT NOT NULL,
    "maxClients" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "lastInfo" TEXT NOT NULL
);
INSERT INTO "new_oltFound" ("Armario", "OltName", "PowerdB", "id", "ipAddress", "maxClients", "status") SELECT "Armario", "OltName", "PowerdB", "id", "ipAddress", "maxClients", "status" FROM "oltFound";
DROP TABLE "oltFound";
ALTER TABLE "new_oltFound" RENAME TO "oltFound";
CREATE UNIQUE INDEX "oltFound_OltName_key" ON "oltFound"("OltName");
CREATE UNIQUE INDEX "oltFound_ipAddress_key" ON "oltFound"("ipAddress");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
