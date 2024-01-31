/*
  Warnings:

  - You are about to drop the column `lastInfo` on the `oltFound` table. All the data in the column will be lost.
  - Added the required column `AccessToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BoardName` to the `slotsOLT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastUpdate` to the `oltFound` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "AccessToken" TEXT NOT NULL,
    "lastLogin" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "privilege" INTEGER NOT NULL
);
INSERT INTO "new_User" ("active", "id", "lastLogin", "name", "password", "privilege") SELECT "active", "id", "lastLogin", "name", "password", "privilege" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
CREATE TABLE "new_slotsOLT" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" INTEGER NOT NULL,
    "slot" TEXT NOT NULL,
    "BoardName" TEXT NOT NULL,
    "OnuDiscovery" INTEGER NOT NULL,
    "OnuProvisioned" INTEGER NOT NULL,
    "OnuOnline" INTEGER NOT NULL,
    "oltId" INTEGER NOT NULL,
    CONSTRAINT "slotsOLT_oltId_fkey" FOREIGN KEY ("oltId") REFERENCES "oltFound" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_slotsOLT" ("OnuDiscovery", "OnuOnline", "OnuProvisioned", "id", "oltId", "slot", "status") SELECT "OnuDiscovery", "OnuOnline", "OnuProvisioned", "id", "oltId", "slot", "status" FROM "slotsOLT";
DROP TABLE "slotsOLT";
ALTER TABLE "new_slotsOLT" RENAME TO "slotsOLT";
CREATE TABLE "new_oltFound" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "OltName" TEXT NOT NULL,
    "Armario" TEXT NOT NULL,
    "PowerdB" TEXT NOT NULL,
    "maxClients" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "lastUpdate" TEXT NOT NULL
);
INSERT INTO "new_oltFound" ("Armario", "OltName", "PowerdB", "id", "ipAddress", "maxClients", "status") SELECT "Armario", "OltName", "PowerdB", "id", "ipAddress", "maxClients", "status" FROM "oltFound";
DROP TABLE "oltFound";
ALTER TABLE "new_oltFound" RENAME TO "oltFound";
CREATE UNIQUE INDEX "oltFound_OltName_key" ON "oltFound"("OltName");
CREATE UNIQUE INDEX "oltFound_ipAddress_key" ON "oltFound"("ipAddress");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
