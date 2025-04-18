// backend/controllers/authController.js

const pool = require('../config/db'); // Veritabanı bağlantısı
const bcrypt = require('bcrypt'); // Şifre hashleme
const jwt = require('jsonwebtoken'); // JWT token oluşturma
const dotenv = require('dotenv');

dotenv.config();

// KAYIT (REGISTER) FONKSİYONU
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // 1. Validasyon (Boş alan kontrolü)
  if (!name || !email || !password) {
    return res.status(400).json({ 
      error: "Lütfen tüm alanları doldurun! (name, email, password)" 
    });
  }

  try {
    // 2. Email kontrolü (Aynı email var mı?)
    const [user] = await pool.query(
      'SELECT * FROM users WHERE email = ?', 
      [email]
    );
    
    if (user.length > 0) {
      return res.status(400).json({ 
        error: "Bu email zaten kayıtlı!" 
      });
    }

    // 3. Şifreyi hashle (Güvenlik için)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4. Veritabanına kaydet
    const [result] = await pool.query(
      `INSERT INTO users 
       (name, email, password) 
       VALUES (?, ?, ?)`,
      [name, email, hashedPassword]
    );

    // 5. Başarılı yanıt
    res.status(201).json({
      message: "Kullanıcı başarıyla oluşturuldu!",
      userId: result.insertId
    });

  } catch (error) {
    console.error("Kayıt hatası:", error);
    res.status(500).json({ 
      error: "Sunucu hatası! Lütfen tekrar deneyin." 
    });
  }
};

// GİRİŞ (LOGIN) FONKSİYONU
const login = async (req, res) => {
  const { email, password } = req.body;

  // 1. Validasyon
  if (!email || !password) {
    return res.status(400).json({ 
      error: "Email ve şifre gereklidir!" 
    });
  }

  try {
    // 2. Kullanıcıyı bul
    const [user] = await pool.query(
      'SELECT * FROM users WHERE email = ?', 
      [email]
    );
    
    if (user.length === 0) {
      return res.status(401).json({ 
        error: "Geçersiz email veya şifre!" 
      });
    }

    // 3. Şifre kontrolü
    const validPassword = await bcrypt.compare(
      password, 
      user[0].password
    );
    
    if (!validPassword) {
      return res.status(401).json({ 
        error: "Geçersiz email veya şifre!" 
      });
    }

    // 4. JWT Token oluştur
    const token = jwt.sign(
      { id: user[0].id, email: user[0].email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 5. Başarılı yanıt (Token ve kullanıcı bilgileri)
    res.json({
      message: "Giriş başarılı!",
      token,
      user: {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email
      }
    });

  } catch (error) {
    console.error("Giriş hatası:", error);
    res.status(500).json({ 
      error: "Sunucu hatası! Lütfen tekrar deneyin." 
    });
  }
};

// FONKSİYONLARI DIŞARI EXPORT ET
module.exports = { register, login };