-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "dtBirth" DATETIME NOT NULL,
    "dtRegistered" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "familyIncome" REAL
);
INSERT INTO "new_Client" ("cpf", "dtBirth", "dtRegistered", "familyIncome", "id", "name") SELECT "cpf", "dtBirth", "dtRegistered", "familyIncome", "id", "name" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client.cpf_unique" ON "Client"("cpf");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
