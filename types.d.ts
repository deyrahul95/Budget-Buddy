export type Transaction = {
  id: number;
  amount: number;
  type: "Expense" | "Income";
  category_id: number;
  description: string | null;
  date: number;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: number;
  name: string;
  type: "Expense" | "Income";
  created_at: string;
  updated_at: string;
};

export type ITimeStamps = {
  startTimeStamp: number;
  endTimeStamp: number;
};

export type TransactionAggregate = {
  totalIncome: number;
  totalExpenses: number;
};

export type TimeStampFilter = {
  filter: "1m" | "3m" | "6m" | "1y";
};
