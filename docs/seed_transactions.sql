-- Seed some dummy Transactions

-- Inserting seed transactions for Expenses
INSERT INTO transactions (amount, type, category_id, description, date) VALUES
(5000.00, 'Expense', (SELECT id FROM categories WHERE name = 'Rent'), 'Monthly rent payment', 1672531200), -- Jan 1, 2023
(1500.00, 'Expense', (SELECT id FROM categories WHERE name = 'Groceries'), 'Weekly groceries shopping', 1672534800), -- Jan 1, 2023
(100.00, 'Expense', (SELECT id FROM categories WHERE name = 'Dining Out'), 'Dinner at restaurant', 1672617600), -- Jan 2, 2023
(75.00, 'Expense', (SELECT id FROM categories WHERE name = 'Utilities'), 'Electricity bill for January', 1672704000), -- Jan 3, 2023
(200.00, 'Expense', (SELECT id FROM categories WHERE name = 'Transportation'), 'Fuel for car', 1672790400), -- Jan 4, 2023
(250.00, 'Expense', (SELECT id FROM categories WHERE name = 'Entertainment'), 'Movie ticket for the weekend', 1672876800); -- Jan 5, 2023

-- Inserting seed transactions for Income
INSERT INTO transactions (amount, type, category_id, description, date) VALUES
(3000.00, 'Income', (SELECT id FROM categories WHERE name = 'Salary'), 'Monthly salary payment', 1672531200), -- Jan 1, 2023
(800.00, 'Income', (SELECT id FROM categories WHERE name = 'Freelance Work'), 'Payment for freelance project', 1672617600), -- Jan 2, 2023
(250.00, 'Income', (SELECT id FROM categories WHERE name = 'Interest Income'), 'Interest earned on savings', 1672704000), -- Jan 3, 2023
(500.00, 'Income', (SELECT id FROM categories WHERE name = 'Investments'), 'Returns from mutual funds', 1672790400), -- Jan 4, 2023
(1500.00, 'Income', (SELECT id FROM categories WHERE name = 'Rental Income'), 'Rent from property', 1672876800); -- Jan 5, 2023
