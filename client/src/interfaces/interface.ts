export type LedgerType = {
  id: string | number
  name:string
  amount:number
  icon:string   
  type:"INCOME" | "EXPENSE"
  color:string,
}
export type TransactionType = {
  id: string | number
  amount: number
  description: string
  date: string
  ledgerId: string | number
  ledger?: LedgerType
}