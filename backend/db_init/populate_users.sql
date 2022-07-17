BEGIN;

with role AS (SELECT role_id FROM iam_role WHERE role_name = 'regular')
    INSERT INTO iam_account (employee_id, name, username, password, role_id, is_active) VALUES 
    (105, 'Alidullatif TAHLIL', 'sankasom', '$2b$10$VXwkvLRKB98WgQMTtI5x/uFWAbcv1wP9jBstq.X4qdXxvJVXtSR9K', (select role_id from role), true),
    (233, 'Halima Elmi Gedi', 'halima', '$2b$10$VXwkvLRKB98WgQMTtI5x/uFWAbcv1wP9jBstq.X4qdXxvJVXtSR9K', (select role_id from role), false),
    (978, 'Farah Mohamud Sadiiq', 'sadiiq', '$2b$10$VXwkvLRKB98WgQMTtI5x/uFWAbcv1wP9jBstq.X4qdXxvJVXtSR9K', (select role_id from role), true);
COMMIT;

SELECT * FROM iam_account;
