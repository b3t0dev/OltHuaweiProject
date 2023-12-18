/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "oltFound" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "OltName" TEXT NOT NULL,
    "Armario" TEXT NOT NULL,
    "PowerdB" TEXT NOT NULL,
    "maxClients" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "slotsOLT" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slotName" TEXT NOT NULL,
    "OnuDiscovery" INTEGER NOT NULL,
    "OnuProvisioned" INTEGER NOT NULL,
    "OnuOnline" INTEGER NOT NULL,
    "oltId" INTEGER NOT NULL,
    CONSTRAINT "slotsOLT_oltId_fkey" FOREIGN KEY ("oltId") REFERENCES "oltFound" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "id", "name", "password") SELECT "email", "id", "name", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "oltFound_OltName_key" ON "oltFound"("OltName");

-- CreateIndex
CREATE UNIQUE INDEX "oltFound_ipAddress_key" ON "oltFound"("ipAddress");
