/*
  Warnings:

  - Added the required column `last_login` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "last_login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "privilege" INTEGER NOT NULL
);
INSERT INTO "new_User" ("id", "name", "password", "privilege") SELECT "id", "name", "password", "privilege" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
