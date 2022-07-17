CREATE TABLE iam_role(
   role_id serial PRIMARY KEY,
   role INTEGER UNIQUE NOT NULL,
   role_name VARCHAR (255) UNIQUE NOT NULL
);

CREATE TABLE iam_account (
  user_id SERIAL PRIMARY KEY,
  employee_id VARCHAR(30) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  username VARCHAR(30) NOT NULL UNIQUE,
  password VARCHAR(64) NOT NULL,
  photo VARCHAR(512) DEFAULT 'default.jpg',
  role_id SERIAL REFERENCES iam_role(role_id) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT 'false',
  is_deleted BOOLEAN NOT NULL DEFAULT 'false'
);

CREATE TABLE customer (
  customer_id SERIAL PRIMARY KEY,
  account_no VARCHAR(30) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(15),
  created_on TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  is_deleted BOOLEAN NOT NULL DEFAULT 'false'
);

CREATE TABLE investment (
  investment_id SERIAL PRIMARY KEY,
  customer_id SERIAL REFERENCES customer(customer_id) NOT NULL,
  amount NUMERIC NOT NULL,
  inv_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  docs VARCHAR(1024) NOT NULL,
  memo VARCHAR(256),
  is_deleted BOOLEAN NOT NULL DEFAULT 'false'
);


----- FUNCTIONS TO TACKLE SPECIFIC OPERATIONS AND TASKS
CREATE FUNCTION updateifchanged (newvalue anyelement, field anyelement, allownull boolean DEFAULT FALSE)
    RETURNS anyelement
    LANGUAGE plpgsql AS $$
BEGIN
    IF (allowNull = FALSE AND newValue IS NULL) OR LOWER(newValue::varchar) = 'null' OR LOWER(newValue::varchar) = 'undefined' THEN
        RETURN field;

    ELSE
        RETURN newValue;

    END IF;

END;

$$;

/*
CREATE TABLE account_roles (
  user_id INT NOT NULL,
  role_id INT NOT NULL,
  grant_date TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (role_id) REFERENCES roles (role_id),
  FOREIGN KEY (user_id) REFERENCES accounts (user_id)
);
*/
