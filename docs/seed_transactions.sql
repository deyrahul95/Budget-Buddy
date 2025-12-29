-- Seed some dummy Transactions

-- Inserting seed transactions for Expenses (December 2025)
INSERT INTO transactions (amount, type, category_id, description, date) VALUES
(5700.00, 'Expense', (SELECT id FROM categories WHERE name = 'Rent'), 'Monthly rent payment', 1764547200), -- Dec 1, 2025
(652.00, 'Expense', (SELECT id FROM categories WHERE name = 'Groceries'), 'Weekly groceries shopping', 1764633600), -- Dec 2, 2025
(1290.00, 'Expense', (SELECT id FROM categories WHERE name = 'EMI'), 'Home Loan EMI', 1764806400), -- Dec 4, 2025
(450.00, 'Expense', (SELECT id FROM categories WHERE name = 'Clothing'), 'Clothing purchase', 1765843200), -- Dec 16, 2025
(745.00, 'Expense', (SELECT id FROM categories WHERE name = 'Utilities'), 'WiFi bill', 1766620800); -- Dec 25, 2025


-- Inserting seed transactions for Income (December 2025)
INSERT INTO transactions (amount, type, category_id, description, date) VALUES
(32000.00, 'Income', (SELECT id FROM categories WHERE name = 'Salary'), 'Monthly salary payment', 1764547200), -- Dec 1, 2025
(757.56, 'Income', (SELECT id FROM categories WHERE name = 'Interest Income'), 'Savings account interest', 1764806400), -- Dec 4, 2025
(900.00, 'Income', (SELECT id FROM categories WHERE name = 'Bonus'), 'Bonus', 1764720000); -- Dec 3, 2025
