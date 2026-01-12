export type TransactionType = {
  amount: number;
  date: string;
  ledgerId: number;
  description?: string;
  userId:number;
  subLedgerId?:number;
  accountId?:number;
};
