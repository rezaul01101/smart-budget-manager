export type TransactionType = {
  amount: number;
  beforeAmount: number;
  afterAmount: number;
  date: string;
  ledgerId: number;
  description?: string;
  userId:number;
  subLedgerId?:number;
  accountId?:number;
};
