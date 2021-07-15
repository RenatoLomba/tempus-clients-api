-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "dtBirth" DATETIME NOT NULL,
    "dtRegistered" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "familyIncome" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Client.cpf_unique" ON "Client"("cpf");
