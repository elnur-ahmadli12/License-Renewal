const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const crypto = require('crypto');
const mysql = require('mysql2');
const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ee123456321!',
    database: 'user_auth'
  });


db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected...');
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ahmadlielnur01@gmail.com', // Gmail adresiniz
      pass: 'iggllaqrscmdffzh' // Oluşturduğunuz uygulama şifresi
    }
  });



app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const activationToken = crypto.randomBytes(20).toString('hex');

  const sql = 'INSERT INTO users (name, email, password, activationToken) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, password, activationToken], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Account Activation',
      text: `Please click the following link to activate your account: http://localhost:3000/activate/${activationToken}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }
      res.status(200).send('Account created. Please check your email to activate your account.');
    });
  });
});

app.get('/activate/:token', (req, res) => {
  const { token } = req.params;

  const sql = 'UPDATE users SET active = 1 WHERE activationToken = ?';
  db.query(sql, [token], (err, result) => {
    if (err) throw err;
    res.send('Account activated successfully.');
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ? AND password = ? AND active = 1';
  db.query(sql, [email, password], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid credentials or account not activated');
    }
  });
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});