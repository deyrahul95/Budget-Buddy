export type Transaction = {
  id: number;
  category_id: number;
  amount: number;
  date: number;
  description: number;
  type: "Expense" | "Income";
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
