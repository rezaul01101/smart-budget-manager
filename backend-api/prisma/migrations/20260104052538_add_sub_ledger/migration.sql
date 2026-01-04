-- CreateTable
CREATE TABLE "SubLedger" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "color" TEXT,
    "ledgerId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "SubLedger_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubLedger" ADD CONSTRAINT "SubLedger_ledgerId_fkey" FOREIGN KEY ("ledgerId") REFERENCES "Ledger"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubLedger" ADD CONSTRAINT "SubLedger_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
