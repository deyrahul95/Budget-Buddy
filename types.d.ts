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
