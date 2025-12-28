-- Seed some dummy Transactions

-- Inserting seed transactions for Expenses (December 2025)
INSERT INTO transactions (amount, type, category_id, description, date) VALUES
(5200.00, 'Expense', (SELECT id FROM categories WHERE name = 'Rent'), 'Monthly rent payment', 1764547200), -- Dec 1, 2025
(1600.00, 'Expense', (SELECT id FROM categories WHERE name = 'Groceries'), 'Weekly groceries shopping', 1764633600), -- Dec 2, 2025
(120.00, 'Expense', (SELECT id FROM categories WHERE name = 'Dining Out'), 'Dinner with friends', 1764720000), -- Dec 3, 2025
(90.00, 'Expense', (SELECT id FROM categories WHERE name = 'Utilities'), 'Electricity bill', 1764806400), -- Dec 4, 2025
(220.00, 'Expense', (SELECT id FROM categories WHERE name = 'Transportation'), 'Fuel for car', 1764892800), -- Dec 5, 2025
(300.00, 'Expense', (SELECT id FROM categories WHERE name = 'Entertainment'), 'Concert ticket', 1764979200), -- Dec 6, 2025
(180.00, 'Expense', (SELECT id FROM categories WHERE name = 'Personal Care'), 'Personal Care expenses', 1765411200), -- Dec 11, 2025
(450.00, 'Expense', (SELECT id FROM categories WHERE name = 'Clothing'), 'Clothing purchase', 1765843200), -- Dec 16, 2025
(130.00, 'Expense', (SELECT id FROM categories WHERE name = 'Dining Out'), 'Weekend lunch', 1766275200), -- Dec 21, 2025
(95.00, 'Expense', (SELECT id FROM categories WHERE name = 'Utilities'), 'Internet bill', 1766620800); -- Dec 25, 2025


-- Inserting seed transactions for Income (December 2025)
INSERT INTO transactions (amount, type, category_id, description, date) VALUES
(3200.00, 'Income', (SELECT id FROM categories WHERE name = 'Salary'), 'Monthly salary payment', 1764547200), -- Dec 1, 2025
(900.00, 'Income', (SELECT id FROM categories WHERE name = 'Freelance Work'), 'Freelance UI project', 1764720000), -- Dec 3, 2025
(275.00, 'Income', (SELECT id FROM categories WHERE name = 'Interest Income'), 'Savings account interest', 1764806400), -- Dec 4, 2025
(600.00, 'Income', (SELECT id FROM categories WHERE name = 'Investments'), 'Stock dividends', 1764892800), -- Dec 5, 2025
(1600.00, 'Income', (SELECT id FROM categories WHERE name = 'Rental Income'), 'Property rent', 1765411200), -- Dec 11, 2025
(450.00, 'Income', (SELECT id FROM categories WHERE name = 'Sales Revenue'), 'Year-end performance bonus', 1765843200), -- Dec 16, 2025
(700.00, 'Income', (SELECT id FROM categories WHERE name = 'Freelance Work'), 'Backend consulting payment', 1766275200); -- Dec 21, 2025
