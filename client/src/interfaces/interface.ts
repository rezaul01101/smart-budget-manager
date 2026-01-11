export type LedgerType = {
  id: string | number;
  name: string;
  amount: number;
  icon: string;
  type: "INCOME" | "EXPENSE";
  color: string;
};
export interface LedgerFormData {
  name: string;
  type: "EXPENSE" | "INCOME";
  icon: string;
  color: string;
  subLedger?: string[];
}
export type TransactionType = {
  id: string | number;
  amount: number;
  description: string;
  date: string;
  ledgerId: string | number;
  ledger?: LedgerType;
  subLedger?: {
    name: string;
    id: number;
  };
};
export interface AccountFormData {
  name: string;
  type: "BANK" | "CASH" | "SAVINGS" | "CREDIT_CARD";
  icon: string;
  color: string;
  balance: number;
  description: string;
}
export interface ApiError {
  status: number;
  data: ApiErrorResponse;
}
export interface ApiErrorResponse {
  success: false;
  message: string;
  errorMessages: ApiErrorMessage[];
  stack?: string; // optional (usually only in dev)
}

export interface ApiErrorMessage {
  path: string;
  message: string;
}

export interface AccountType {
  id: string | number;
  name: string;
  type: "BANK" | "CASH" | "SAVINGS" | "CREDIT_CARD";
  icon: string;
  color: string;
  balance: number;
  description: string;
}

