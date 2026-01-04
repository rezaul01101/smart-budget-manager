export type LedgerType = {
  userId?: number;
  name: string;
  type: "INCOME" | "EXPENSE";
  icon: string;
  color: string;
  subLedger?: string[];
};

