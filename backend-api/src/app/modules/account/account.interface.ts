export type AccountType = {
  name: string;
  type: "BANK" | "CASH" | "SAVINGS" | "CREDIT_CARD";
  balance?: number;
  icon?: string;
  color?: string;
};

export type UpdateAccountType = {
  name?: string;
  type?: "BANK" | "CASH" | "SAVINGS" | "CREDIT_CARD";
  balance?: number;
  icon?: string;
  color?: string;
};
