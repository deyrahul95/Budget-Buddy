
-- Create categories table
CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT CHECK (type IN ('Expense', 'Income')) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Trigger to update `updated_at` on row updates
CREATE TRIGGER update_categories_timestamp
AFTER UPDATE ON categories
FOR EACH ROW
BEGIN
    UPDATE categories SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;

-- Create transactions table
CREATE TABLE transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount DECIMAL(10, 2) NOT NULL,
    type TEXT CHECK (type IN ('Expense', 'Income')) NOT NULL,
    category_id INTEGER,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories (id)
);

-- Trigger to update `updated_at` on row updates
CREATE TRIGGER update_transactions_timestamp
AFTER UPDATE ON transactions
FOR EACH ROW
BEGIN
    UPDATE transactions SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;


-- Inserting default categories for expenses
INSERT INTO categories (name, type) VALUES
('EMI', 'Expense'),
('Groceries', 'Expense'),
('Food', 'Expense'),
('Rent', 'Expense'),
('Utilities', 'Expense'),
('Transportation', 'Expense'),
('Dining Out', 'Expense'),
('Entertainment', 'Expense'),
('Healthcare', 'Expense'),
('Insurance', 'Expense'),
('Personal Care', 'Expense'),
('Clothing', 'Expense'),
('Gifts', 'Expense');

-- Inserting default categories for income
INSERT INTO categories (name, type) VALUES
('Salary', 'Income'),
('Freelance Work', 'Income'),
('Investments', 'Income'),
('Rental Income', 'Income'),
('Sales Revenue', 'Income'),
('Interest Income', 'Income'),
('Dividends', 'Income'),
('Gifts', 'Income'),
('Pension', 'Income'),
('Royalties', 'Income');
