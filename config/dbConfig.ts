import { SQLiteDatabase } from "expo-sqlite";

export const DBConfig = {
  DBName: "budget.db",
};

export const DBQuery = {
  // Transaction
  GetAllTransactions:
    "SELECT * FROM transactions WHERE date >= ? AND date <= ? ORDER BY date DESC;",
  TransactionByTimeStamp: `
    SELECT 
    COALESCE(SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END), 0) AS totalExpenses,
    COALESCE(SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END), 0) AS totalIncome
    FROM transactions
    WHERE date >= ? AND date <= ?;
    `,
  DeleteTransaction: "DELETE FROM transactions WHERE id = ?;",
  AddTransaction:
    "INSERT INTO transactions (amount, type, category_id, description, date) VALUES (?,?,?,?,?);",

  // Category
  GetAllCategories: "SELECT * FROM categories;",
};

export const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
  const DATABASE_VERSION = 1;
  let result = await db.getFirstAsync<{ user_version: number }>(
    "PRAGMA user_version",
  );
  let currentDbVersion = result?.user_version;

  if (currentDbVersion === undefined || currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT CHECK (type IN ('Expense', 'Income')) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount DECIMAL(10, 2) NOT NULL,
        type TEXT CHECK (type IN ('Expense', 'Income')) NOT NULL,
        category_id INTEGER NOT NULL,
        description TEXT,
        date INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories (id)
      );
    `);
    currentDbVersion = 1;
  }
  if (currentDbVersion === 1) {
    await db.execAsync(`
      INSERT INTO categories (name, type) VALUES
        ('Food', 'Expense'),
        ('Groceries', 'Expense'),
        ('Utilities', 'Expense'),
        ('Rent', 'Expense'),
        ('EMI', 'Expense'),
        ('Clothing', 'Expense'),
        ('Personal Care', 'Expense'),
        ('Entertainment', 'Expense'),
        ('Transportation', 'Expense'),
        ('Healthcare', 'Expense'),
        ('Insurance', 'Expense'),
        ('Gifts', 'Expense'),
        ('Dining Out', 'Expense');
      INSERT INTO categories (name, type) VALUES
        ('Salary', 'Income'),
        ('Bonus', 'Income'),
        ('Interest Income', 'Income'),
        ('Freelance Work', 'Income'),
        ('Investments', 'Income'),
        ('Rental Income', 'Income');
    `);
  }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
};
