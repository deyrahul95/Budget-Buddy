
-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT CHECK (type IN ('Expense', 'Income')) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Trigger to update `updated_at` on row updates
CREATE TRIGGER IF NOT EXISTS update_categories_timestamp
AFTER UPDATE ON categories
FOR EACH ROW
BEGIN
    UPDATE categories SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;

-- Create transactions table
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

-- Trigger to update `updated_at` on row updates
CREATE TRIGGER IF NOT EXISTS update_transactions_timestamp
AFTER UPDATE ON transactions
FOR EACH ROW
BEGIN
    UPDATE transactions SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;


-- Inserting default categories for expenses
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

-- Inserting default categories for income
INSERT INTO categories (name, type) VALUES
('Salary', 'Income'),
('Bonus', 'Income'),
('Interest Income', 'Income'),
('Freelance Work', 'Income'),
('Investments', 'Income'),
('Rental Income', 'Income');