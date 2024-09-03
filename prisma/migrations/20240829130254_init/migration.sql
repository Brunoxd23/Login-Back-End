-- CreateTable
CREATE TABLE "agendamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL,
    "horario" DATETIME NOT NULL,
    "curso" TEXT NOT NULL,
    "sala" TEXT NOT NULL,
    "disciplina" TEXT NOT NULL,
    "tipoProva" TEXT NOT NULL,
    "suporte" TEXT NOT NULL
);
