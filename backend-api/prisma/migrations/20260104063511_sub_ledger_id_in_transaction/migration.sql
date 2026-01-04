-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "subLedgerId" INTEGER;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_subLedgerId_fkey" FOREIGN KEY ("subLedgerId") REFERENCES "SubLedger"("id") ON DELETE SET NULL ON UPDATE CASCADE;
