/*
  Warnings:

  - Added the required column `key` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "description" TEXT,
    "numIssues" INTEGER NOT NULL
);
INSERT INTO "new_Project" ("description", "id", "name", "numIssues") SELECT "description", "id", "name", "numIssues" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_key_key" ON "Project"("key");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
