-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "lastLogin" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "privilege" INTEGER NOT NULL
);
INSERT INTO "new_User" ("id", "lastLogin", "name", "password", "privilege") SELECT "id", "lastLogin", "name", "password", "privilege" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
