আমি আপনাকে বাংলায় ব্যাখ্যা করব কীভাবে আপনি **Ubuntu Linux**-এ একটি **Express.js** সার্ভারে **MySQL** ডাটাবেস ব্যবহার করতে পারেন। ধাপে ধাপে সহজভাবে বুঝিয়ে দেব। 

### ধাপ ১: প্রয়োজনীয় সফটওয়্যার ইনস্টল করা
1. **Node.js এবং npm ইনস্টল করুন**:
   - আপনার Ubuntu সিস্টেমে Node.js এবং npm ইনস্টল করতে নিম্নলিখিত কমান্ডগুলো চালান:
     ```bash
     sudo apt update
     sudo apt install nodejs npm
     ```
   - Node.js ভার্সন চেক করতে:
     ```bash
     node -v
     npm -v
     ```

2. **MySQL ইনস্টল করুন**:
   - MySQL সার্ভার ইনস্টল করতে:
     ```bash
     sudo apt install mysql-server
     ```
   - MySQL সার্ভার চালু আছে কিনা চেক করতে:
     ```bash
     sudo systemctl status mysql
     ```
   - MySQL সিকিউর করতে:
     ```bash
     sudo mysql_secure_installation
     ```
     এখানে আপনি রুট পাসওয়ার্ড সেট করবেন এবং অন্যান্য সিকিউরিটি সেটিংস কনফিগার করবেন।

3. **MySQL-এ ডাটাবেস তৈরি করা**:
   - MySQL-এ লগইন করুন:
     ```bash
     sudo mysql -u root -p
     ```
   - একটি নতুন ডাটাবেস তৈরি করুন, যেমন:
     ```sql
     CREATE DATABASE mydatabase;
     ```
   - ডাটাবেসে একটি টেবিল তৈরি করুন (উদাহরণস্বরূপ):
     ```sql
     USE mydatabase;
     CREATE TABLE users (
         id INT AUTO_INCREMENT PRIMARY KEY,
         name VARCHAR(255),
         email VARCHAR(255)
     );
     ```
   - MySQL থেকে বের হতে:
     ```sql
     EXIT;
     ```

### ধাপ ২: Express.js প্রজেক্ট সেটআপ
1. **প্রজেক্ট ফোল্ডার তৈরি করুন**:
   - একটি নতুন ফোল্ডার তৈরি করুন এবং সেখানে যান:
     ```bash
     mkdir my-express-app
     cd my-express-app
     ```
   - npm ইনিশিয়ালাইজ করুন:
     ```bash
     npm init -y
     ```

2. **প্রয়োজনীয় প্যাকেজ ইনস্টল করুন**:
   - Express.js এবং MySQL প্যাকেজ ইনস্টল করুন:
     ```bash
     npm install express mysql2
     ```

3. **Express.js সার্ভার তৈরি করুন**:
   - `index.js` নামে একটি ফাইল তৈরি করুন এবং নিচের কোডটি যোগ করুন:
     ```javascript
     const express = require('express');
     const mysql = require('mysql2');
     const app = express();
     const port = 3000;

     // JSON পার্সিং এনাবল করুন
     app.use(express.json());

     // MySQL কানেকশন সেটআপ
     const db = mysql.createConnection({
         host: 'localhost',
         user: 'root', // আপনার MySQL রুট ইউজারনেম
         password: 'your_password', // আপনার MySQL পাসওয়ার্ড
         database: 'mydatabase' // আপনার ডাটাবেসের নাম
     });

     // MySQL কানেকশন চেক করুন
     db.connect((err) => {
         if (err) {
             console.error('ডাটাবেস কানেকশন ব্যর্থ:', err);
             return;
         }
         console.log('MySQL ডাটাবেসে সফলভাবে কানেক্টেড');
     });

     // সার্ভার চালু করুন
     app.listen(port, () => {
         console.log(`সার্ভার http://localhost:${port} এ চলছে`);
     });
     ```

   - **ব্যাখ্যা**:
     - `mysql2` মডিউল ব্যবহার করে MySQL-এর সাথে কানেক্ট করা হচ্ছে।
     - `host`, `user`, `password`, এবং `database` পরিবর্তন করে আপনার MySQL কনফিগারেশন সেট করুন।
     - `app.use(express.json())` দিয়ে JSON রিকোয়েস্ট পার্স করা হচ্ছে।

### ধাপ ৩: API তৈরি করা
এখন আমরা কিছু বেসিক API তৈরি করব যাতে ডাটাবেসের সাথে ডাটা পড়া, লেখা, আপডেট, এবং ডিলিট করা যায়।

`index.js`-এ নিচের কোডগুলো যোগ করুন:

```javascript
// নতুন ইউজার যোগ করা (POST)
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(query, [name, email], (err, result) => {
        if (err) {
            res.status(500).send('ইউজার যোগ করতে ব্যর্থ');
            return;
        }
        res.status(201).send('ইউজার সফলভাবে যোগ করা হয়েছে');
    });
});

// সব ইউজার পড়া (GET)
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('ইউজার পড়তে ব্যর্থ');
            return;
        }
        res.json(results);
    });
});

// নির্দিষ্ট ইউজার পড়া (GET by ID)
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err || results.length === 0) {
            res.status(404).send('ইউজার পাওয়া যায়নি');
            return;
        }
        res.json(results[0]);
    });
});

// ইউজার আপডেট করা (PUT)
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    db.query(query, [name, email, id], (err, result) => {
        if (err || result.affectedRows === 0) {
            res.status(404).send('ইউজার আপডেট করতে ব্যর্থ');
            return;
        }
        res.send('ইউজার সফলভাবে আপডেট করা হয়েছে');
    });
});

// ইউজার ডিলিট করা (DELETE)
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err || result.affectedRows === 0) {
            res.status(404).send('ইউজার ডিলিট করতে ব্যর্থ');
            return;
        }
        res.send('ইউজার সফলভাবে ডিলিট করা হয়েছে');
    });
});
```

### ধাপ ৪: সার্ভার চালানো
- সার্ভার চালু করতে নিচের কমান্ডটি ব্যবহার করুন:
  ```bash
  node index.js
  ```
- সার্ভার চললে আপনি দেখবেন: `সার্ভার http://localhost:3000 এ চলছে`।

### ধাপ ৫: API টেস্ট করা
- **Postman** বা **cURL** ব্যবহার করে API টেস্ট করতে পারেন। উদাহরণস্বরূপ:
  - নতুন ইউজার যোগ করতে (POST):
    ```bash
    curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name":"John Doe","email":"john@example.com"}'
    ```
  - সব ইউজার দেখতে (GET):
    ```bash
    curl http://localhost:3000/users
    ```

### ধাপ ৬: সমস্যা সমাধান
- **MySQL কানেকশন ত্রুটি**: নিশ্চিত করুন যে MySQL সার্ভার চলছে এবং `index.js`-এ সঠিক `user`, `password`, এবং `database` নাম ব্যবহার করেছেন।
- **পোর্ট ব্যবহৃত হচ্ছে**: যদি পোর্ট 3000 ব্যবহৃত হয়, তবে অন্য পোর্ট ব্যবহার করুন (যেমন, `port = 3001`)।
- **ডাটাবেস ত্রুটি**: নিশ্চিত করুন যে ডাটাবেস এবং টেবিল সঠিকভাবে তৈরি হয়েছে।

### অতিরিক্ত পরামর্শ
- **Environment Variables**: পাসওয়ার্ড এবং অন্যান্য সংবেদনশীল তথ্যের জন্য `.env` ফাইল ব্যবহার করুন। এর জন্য `dotenv` প্যাকেজ ইনস্টল করুন:
  ```bash
  npm install dotenv
  ```
  `.env` ফাইলে:
  ```plaintext
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=your_password
  DB_NAME=mydatabase
  ```
  এবং `index.js`-এ:
  ```javascript
  require('dotenv').config();
  const db = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
  });
  ```

- **ডকুমেন্টেশন**: MySQL এবং Express.js-এর অফিসিয়াল ডকুমেন্টেশন পড়ুন।
- **সিকিউরিটি**: প্রোডাকশনে SQL ইনজেকশন এড়াতে parameterized queries ব্যবহার করুন (উপরের কোডে ইতিমধ্যে এটি করা হয়েছে)।

যদি কোনো সমস্যা হয় বা আরও বিস্তারিত জানতে চান, তাহলে বলুন!