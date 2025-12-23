export type LedgerType = {
  name:string
  amount:number
  icon:React.ComponentType<React.SVGProps<SVGSVGElement>>   
  type:"INCOME" | "EXPENSE"
  color:string
}