# নিচে আমি MySQL টার্মিনালের সবচেয়ে দরকারি কমান্ডগুলো দিয়েছি, যেগুলো ডেটাবেজ তৈরি, টেবিল তৈরি, দেখা, ডিলিট করা ইত্যাদিতে ব্যবহৃত হয়। সাথে বাংলা ব্যাখ্যা ।

---

## 🔵 ডাটাবেজ সম্পর্কিত কমান্ড

| ✅ কমান্ড                   | 📄 কাজ                           | 🧠 উদাহরণ                   |
| -------------------------- | -------------------------------- | --------------------------- |
| `CREATE DATABASE db_name;` | নতুন ডেটাবেজ তৈরি করে            | `CREATE DATABASE testAuth;` |
| `SHOW DATABASES;`          | সব ডেটাবেজের তালিকা দেখায়        | —                           |
| `USE db_name;`             | নির্দিষ্ট ডেটাবেজে কাজ করতে ঢুকে | `USE testAuth;`             |
| `DROP DATABASE db_name;`   | ডেটাবেজ সম্পূর্ণ ডিলিট করে       | `DROP DATABASE testAuth;`   |

---

## 🟢 টেবিল (Table) সম্পর্কিত কমান্ড

| ✅ কমান্ড                                     | 📄 কাজ                                 | 🧠 উদাহরণ               |
| -------------------------------------------- | -------------------------------------- | ----------------------- |
| `CREATE TABLE table_name (...);`             | নতুন টেবিল তৈরি করে                    | নিচে উদাহরণ দেখ         |
| `SHOW TABLES;`                               | নির্দিষ্ট ডেটাবেজে থাকা সব টেবিল দেখায় | —                       |
| `DESCRIBE table_name;` বা `DESC table_name;` | টেবিলের কলাম ও টাইপ দেখায়              | `DESCRIBE users;`       |
| `DROP TABLE table_name;`                     | টেবিল মুছে দেয়                         | `DROP TABLE users;`     |
| `TRUNCATE TABLE table_name;`                 | সব ডেটা মুছে, কিন্তু টেবিল রেখে দেয়    | `TRUNCATE TABLE users;` |

📌 উদাহরণ টেবিল তৈরির:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100)
);
```

---

## 🟡 ডেটা ইনসার্ট, দেখানো, আপডেট ও ডিলিট

| ✅ কমান্ড                                              | 📄 কাজ                   | 🧠 উদাহরণ                                                               |
| ----------------------------------------------------- | ------------------------ | ----------------------------------------------------------------------- |
| `INSERT INTO table (col1, col2) VALUES (val1, val2);` | নতুন ডেটা যোগ করে        | `INSERT INTO users (name, email) VALUES ('Ashraful', 'ash@gmail.com');` |
| `SELECT * FROM table;`                                | টেবিলের সব ডেটা দেখায়    | `SELECT * FROM users;`                                                  |
| `SELECT name FROM users;`                             | নির্দিষ্ট কলাম দেখায়     | `SELECT name FROM users;`                                               |
| `UPDATE table SET col='val' WHERE condition;`         | ডেটা আপডেট করে           | `UPDATE users SET name='Isho' WHERE id=1;`                              |
| `DELETE FROM table WHERE condition;`                  | নির্দিষ্ট ডেটা ডিলিট করে | `DELETE FROM users WHERE id=1;`                                         |

---

## 🔴 এক্সট্রা দরকারি কমান্ড

| ✅ কমান্ড                   | 📄 কাজ                       |
| -------------------------- | ---------------------------- |
| `EXIT;`                    | MySQL টার্মিনাল থেকে বের হয়  |
| `STATUS;`                  | সার্ভার সংযোগের তথ্য দেখায়   |
| `SHOW COLUMNS FROM table;` | নির্দিষ্ট টেবিলের কলাম দেখায় |

---

## 🔁 অনুশীলনের জন্য সংক্ষিপ্ত চিটশিট:

```sql
CREATE DATABASE test;
USE test;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100)
);

INSERT INTO users (name, email) VALUES ('Isho', 'isho@gmail.com');
SELECT * FROM users;

UPDATE users SET name='Ashraful' WHERE id=1;
DELETE FROM users WHERE id=1;

DROP TABLE users;
DROP DATABASE test;
```

---

# উপরের কমান্ডগুলোর সাথে আমি আরো কিছু গুরুত্বপূর্ণ MySQL টার্মিনাল কমান্ড যোগ করছি, যেগুলো ডেটাবেজ ম্যানেজমেন্ট, কোয়েরি অপটিমাইজেশন, ইনডেক্সিং, এবং অ্যাডভান্সড ফিচারের জন্য ব্যবহৃত হয়। প্রতিটি কমান্ডের বাংলায় ব্যাখ্যা। 

---

## 🔵 ডাটাবেজ ম্যানেজমেন্টের অতিরিক্ত কমান্ড

| ✅ কমান্ড                                      | 📄 কাজ                                                                 | 🧠 উদাহরণ                              |
| --------------------------------------------- | --------------------------------------------------------------------- | -------------------------------------- |
| `ALTER DATABASE db_name CHARACTER SET charset;` | ডেটাবেজের ক্যারেক্টার সেট বা কলেশন পরিবর্তন করে                        | `ALTER DATABASE test CHARACTER SET utf8mb4;` |
| `SHOW CREATE DATABASE db_name;`               | ডেটাবেজ তৈরির সম্পূর্ণ SQL স্টেটমেন্ট দেখায়                           | `SHOW CREATE DATABASE test;`           |
| `BACKUP DATABASE db_name TO DISK='file';`     | ডেটাবেজের ব্যাকআপ নেয় (mysqldump দিয়ে, টার্মিনালে ব্যবহৃত)            | `mysqldump -u root -p test > backup.sql` |
| `RESTORE DATABASE db_name FROM DISK='file';`  | ব্যাকআপ থেকে ডেটাবেজ রিস্টোর করে (mysql কমান্ড দিয়ে)                  | `mysql -u root -p test < backup.sql`   |

**ব্যাখ্যা**: 
- `ALTER DATABASE` দিয়ে তুমি ডেটাবেজের ক্যারেক্টার সেট পরিবর্তন করতে পারো, যেমন বাংলা বা অন্য ভাষার জন্য `utf8mb4` সেট করা।
- `mysqldump` কমান্ড ডেটাবেজ ব্যাকআপ নিতে ব্যবহৃত হয়, যা ফাইলে সেভ হয়। রিস্টোর করতে `mysql` কমান্ড ব্যবহার করা হয়।

---

## 🟢 টেবিল ম্যানেজমেন্টের অতিরিক্ত কমান্ড

| ✅ কমান্ড                                     | 📄 কাজ                                                                 | 🧠 উদাহরণ                              |
| -------------------------------------------- | --------------------------------------------------------------------- | -------------------------------------- |
| `ALTER TABLE table_name ADD column_name datatype;` | টেবিলে নতুন কলাম যোগ করে                                              | `ALTER TABLE users ADD age INT;`       |
| `ALTER TABLE table_name DROP COLUMN column_name;` | টেবিল থেকে কলাম মুছে ফেলে                                              | `ALTER TABLE users DROP COLUMN age;`   |
| `ALTER TABLE table_name MODIFY COLUMN column_name datatype;` | কলামের ডেটাটাইপ পরিবর্তন করে                                           | `ALTER TABLE users MODIFY COLUMN name VARCHAR(150);` |
| `RENAME TABLE old_name TO new_name;`         | টেবিলের নাম পরিবর্তন করে                                               | `RENAME TABLE users TO customers;`     |
| `SHOW CREATE TABLE table_name;`              | টেবিল তৈরির সম্পূর্ণ SQL স্টেটমেন্ট দেখায়                              | `SHOW CREATE TABLE users;`             |

**ব্যাখ্যা**:
- `ALTER TABLE` দিয়ে তুমি টেবিলের গঠন পরিবর্তন করতে পারো, যেমন নতুন কলাম যোগ করা, কলাম মুছে ফেলা, বা ডেটাটাইপ চেঞ্জ করা।
- `RENAME TABLE` দিয়ে টেবিলের নাম বদলানো যায়, যা ডেটাবেজ রিস্ট্রাকচারিংয়ে কাজে লাগে।

📌 উদাহরণ:

```sql
ALTER TABLE users ADD phone VARCHAR(15);
ALTER TABLE users DROP COLUMN phone;
RENAME TABLE users TO customers;
```

---

## 🟡 ডেটা কোয়েরি ও ম্যানিপুলেশনের অতিরিক্ত কমান্ড

| ✅ কমান্ড                                              | 📄 কাজ                                                                 | 🧠 উদাহরণ                                                               |
| ----------------------------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `SELECT DISTINCT column FROM table;`                  | ডুপ্লিকেট ডেটা বাদ দিয়ে নির্দিষ্ট কলামের ইউনিক মান দেখায়              | `SELECT DISTINCT name FROM users;`                                      |
| `SELECT * FROM table WHERE condition ORDER BY column;` | ডেটা ফিল্টার করে এবং সাজিয়ে (ascending/descending) দেখায়               | `SELECT * FROM users WHERE age > 18 ORDER BY name ASC;`                 |
| `SELECT * FROM table LIMIT n;`                        | নির্দিষ্ট সংখ্যক রেকর্ড দেখায়                                          | `SELECT * FROM users LIMIT 5;`                                          |
| `SELECT * FROM table WHERE column LIKE 'pattern';`    | নির্দিষ্ট প্যাটার্নের সাথে মিলে যাওয়া ডেটা খুঁজে                           | `SELECT * FROM users WHERE email LIKE '%gmail.com';`                    |
| `INSERT INTO table SELECT ...;`                       | এক টেবিল থেকে ডেটা কপি করে অন্য টেবিলে ইনসার্ট করে                     | `INSERT INTO new_users SELECT * FROM users WHERE age > 18;`             |
| `REPLACE INTO table (col1, col2) VALUES (val1, val2);`| ডেটা ইনসার্ট করে, যদি ডুপ্লিকেট থাকে তবে রিপ্লেস করে                   | `REPLACE INTO users (id, name) VALUES (1, 'Isho');`                     |

**ব্যাখ্যা**:
- `DISTINCT` ডুপ্লিকেট ডেটা ফিল্টার করে ইউনিক মান দেখায়।
- `ORDER BY` দিয়ে ডেটা সাজানো যায় (ASC = ওপরে, DESC = নিচে)।
- `LIKE` দিয়ে প্যাটার্ন ম্যাচিং করা যায়, যেমন ইমেইল ডোমেইন খুঁজে বের করা।
- `REPLACE INTO` ডুপ্লিকেট ডেটা থাকলে তা ওভাররাইট করে।

📌 উদাহরণ:

```sql
SELECT DISTINCT email FROM users;
SELECT * FROM users WHERE age > 18 ORDER BY name DESC LIMIT 3;
SELECT * FROM users WHERE name LIKE 'A%';
```

---

## 🔴 ইনডেক্স ও পারফরম্যান্স কমান্ড

| ✅ কমান্ড                                     | 📄 কাজ                                                                 | 🧠 উদাহরণ                              |
| -------------------------------------------- | --------------------------------------------------------------------- | -------------------------------------- |
| `CREATE INDEX index_name ON table (column);` | টেবিলের কলামে ইনডেক্স তৈরি করে, কোয়েরি দ্রুত করে                       | `CREATE INDEX idx_email ON users (email);` |
| `DROP INDEX index_name ON table;`            | ইনডেক্স মুছে ফেলে                                                     | `DROP INDEX idx_email ON users;`       |
| `EXPLAIN SELECT ...;`                        | কোয়েরি কীভাবে কাজ করছে তা বিশ্লেষণ করে (পারফরম্যান্স চেক করতে)         | `EXPLAIN SELECT * FROM users WHERE email='ash@gmail.com';` |

**ব্যাখ্যা**:
- `INDEX` তৈরি করলে কোয়েরি দ্রুত হয়, বিশেষ করে বড় ডেটাবেজে।
- `EXPLAIN` দিয়ে তুমি দেখতে পারো MySQL কীভাবে তোমার কোয়েরি এক্সিকিউট করছে।

---

## 🟣 ইউজার ম্যানেজমেন্ট ও পারমিশন কমান্ড

| ✅ কমান্ড                                              | 📄 কাজ                                                                 | 🧠 উদাহরণ                                                               |
| ----------------------------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `CREATE USER 'username'@'host' IDENTIFIED BY 'password';` | নতুন ইউজার তৈরি করে                                                  | `CREATE USER 'isho'@'localhost' IDENTIFIED BY 'pass123';`               |
| `GRANT ALL ON db_name.* TO 'username'@'host';`        | ইউজারকে ডেটাবেজে সব পারমিশন দেয়                                       | `GRANT ALL ON test.* TO 'isho'@'localhost';`                            |
| `REVOKE permission ON db_name.* FROM 'username'@'host';` | ইউজারের পারমিশন বাতিল করে                                             | `REVOKE SELECT ON test.* FROM 'isho'@'localhost';`                      |
| `DROP USER 'username'@'host';`                       | ইউজার মুছে ফেলে                                                       | `DROP USER 'isho'@'localhost';`                                         |
| `SHOW GRANTS FOR 'username'@'host';`                  | ইউজারের পারমিশন দেখায়                                                 | `SHOW GRANTS FOR 'isho'@'localhost';`                                   |

**ব্যাখ্যা**:
- `CREATE USER` দিয়ে নতুন MySQL ইউজার তৈরি করা যায়।
- `GRANT` দিয়ে ইউজারকে ডেটাবেজে অ্যাক্সেস দেওয়া যায়, যেমন SELECT, INSERT, বা UPDATE করার অনুমতি।
- `REVOKE` দিয়ে পারমিশন ফিরিয়ে নেওয়া যায়।

📌 উদাহরণ:

```sql
CREATE USER 'ashraful'@'localhost' IDENTIFIED BY 'securepass';
GRANT SELECT, INSERT ON test.* TO 'ashraful'@'localhost';
SHOW GRANTS FOR 'ashraful'@'localhost';
```

---

## 🟠 ট্রানজেকশন কমান্ড (Transaction Commands)

| ✅ কমান্ড                      | 📄 কাজ                                                                 | 🧠 উদাহরণ                              |
| ------------------------------ | --------------------------------------------------------------------- | -------------------------------------- |
| `START TRANSACTION;`           | ট্রানজেকশন শুরু করে, যাতে পরিবর্তনগুলো কমিট না হওয়া পর্যন্ত সেভ না হয় | `START TRANSACTION;`                   |
| `COMMIT;`                      | ট্রানজেকশনের পরিবর্তনগুলো স্থায়ীভাবে সেভ করে                           | `COMMIT;`                              |
| `ROLLBACK;`                    | ট্রানজেকশনের পরি�বর্তনগুলো বাতিল করে                                   | `ROLLBACK;`                            |
| `SET AUTOCOMMIT = 0;`         | অটোমেটিক কমিট বন্ধ করে                                               | `SET AUTOCOMMIT = 0;`                  |

**ব্যাখ্যা**:
- ট্রানজেকশন ব্যবহার করা হয় সংবেদনশীল ডেটা পরিবর্তনের সময়, যেন কোনো ভুল হলে তা ফিরিয়ে নেওয়া যায় (`ROLLBACK`)।
- `COMMIT` দিয়ে পরিবর্তন স্থায়ী করা হয়।

📌 উদাহরণ:

```sql
START TRANSACTION;
INSERT INTO users (name, email) VALUES ('Isho', 'isho@gmail.com');
UPDATE users SET email = 'new@gmail.com' WHERE id = 1;
COMMIT; -- অথবা ভুল হলে ROLLBACK;
```

---

## 🔁 সম্পূর্ণ চিটশিট (অনুশীলনের জন্য):

```sql
-- ডেটাবেজ তৈরি ও ব্যবহার
CREATE DATABASE myapp;
USE myapp;

-- টেবিল তৈরি
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    salary INT
);

-- ইনডেক্স তৈরি
CREATE INDEX idx_name ON employees (name);

-- ডেটা ইনসার্ট
INSERT INTO employees (name, email, salary) VALUES ('Ashraful', 'ash@gmail.com', 50000);

-- ডেটা দেখা
SELECT * FROM employees WHERE salary > 40000 ORDER BY name ASC LIMIT 2;

-- ডেটা আপডেট
UPDATE employees SET salary = 55000 WHERE id = 1;

-- ট্রানজেকশন
START TRANSACTION;
DELETE FROM employees WHERE id = 1;
ROLLBACK; -- বা COMMIT;

-- টেবিল ও ডেটাবেজ মুছে ফেলা
DROP TABLE employees;
DROP DATABASE myapp;
```

---

## 💡 টিপস
- তুমি যদি ফ্রিল্যান্সিং বা প্রোজেক্টে কাজ করো, তাহলে `mysqldump` দিয়ে ব্যাকআপ আর `EXPLAIN` দিয়ে কোয়েরি অপটিমাইজেশন শিখে রাখো। এগুলো ক্লায়েন্টের কাছে তোমার দক্ষতা দেখাতে সাহায্য করবে।
- যদি তুমি চাও, আমি এই কমান্ডগুলোর একটা PDF বা Markdown ফাইল তৈরি করে দিতে পারি। শুধু বলো!

আর কিছু জানতে চাইলে বলো, আমি সব বিস্তারিত বুঝিয়ে দেবো! 😎
