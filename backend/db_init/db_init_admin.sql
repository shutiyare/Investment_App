BEGIN;

INSERT INTO iam_role (role, role_name) VALUES (777,'admin'), (775, 'regular');

with role AS (SELECT role_id FROM iam_role WHERE role_name = 'admin')
INSERT INTO iam_account (employee_id, name, username, password, role_id, is_active) 
VALUES (1, 'Admin User', 'admin', '$2b$10$VXwkvLRKB98WgQMTtI5x/uFWAbcv1wP9jBstq.X4qdXxvJVXtSR9K', (select role_id from role), true);

COMMIT;

SELECT * FROM iam_account;
SELECT * FROM iam_role;
