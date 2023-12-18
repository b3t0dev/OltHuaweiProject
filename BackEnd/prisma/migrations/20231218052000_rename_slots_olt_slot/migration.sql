/*
  Warnings:

  - You are about to drop the column `slotName` on the `slotsOLT` table. All the data in the column will be lost.
  - Added the required column `slot` to the `slotsOLT` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_slotsOLT" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" INTEGER NOT NULL,
    "slot" TEXT NOT NULL,
    "OnuDiscovery" INTEGER NOT NULL,
    "OnuProvisioned" INTEGER NOT NULL,
    "OnuOnline" INTEGER NOT NULL,
    "oltId" INTEGER NOT NULL,
    CONSTRAINT "slotsOLT_oltId_fkey" FOREIGN KEY ("oltId") REFERENCES "oltFound" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_slotsOLT" ("OnuDiscovery", "OnuOnline", "OnuProvisioned", "id", "oltId", "status") SELECT "OnuDiscovery", "OnuOnline", "OnuProvisioned", "id", "oltId", "status" FROM "slotsOLT";
DROP TABLE "slotsOLT";
ALTER TABLE "new_slotsOLT" RENAME TO "slotsOLT";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
