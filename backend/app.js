require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const pool = require('./config/db');
const { sendReminderEmail } = require('./services/emailService');
const authRoutes = require('./routes/authRoutes');
const reminderRoutes = require('./routes/reminderRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/reminders', reminderRoutes);

// Cron Job: Her gün sabah 9'da çalışacak hatırlatıcı
cron.schedule('0 9 * * *', async () => {
  console.log('⏰ Cron Job çalıştı: Ehliyet ve araç vergisi kontrolü...');
  
  try {
    // 1. Ehliyeti 30 gün içinde dolacak kullanıcıları bul
    const [users] = await pool.query(
      `SELECT * FROM users 
       WHERE driving_license_expiry BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY)`
    );

    // 2. Araç vergisi 30 gün içinde dolacak kullanıcıları bul
    const [vehicles] = await pool.query(
      `SELECT users.email, users.name, vehicles.plate_number, vehicles.road_tax_expiry 
       FROM vehicles 
       JOIN users ON vehicles.user_id = users.id 
       WHERE vehicles.road_tax_expiry BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY)`
    );

    // 3. Email gönder
    users.forEach(user => {
      sendReminderEmail(
        user.email,
        '🚗 Ehliyet Yenileme Hatırlatıcı',
        `Sayın ${user.name}, ehliyetinizin süresi ${user.driving_license_expiry.toLocaleDateString()} tarihinde doluyor.`
      );
    });

    vehicles.forEach(vehicle => {
      sendReminderEmail(
        vehicle.email,
        '📌 Araç Vergisi Yenileme Hatırlatıcı',
        `Sayın ${vehicle.name}, ${vehicle.plate_number} plakalı aracınızın vergi süresi ${vehicle.road_tax_expiry.toLocaleDateString()} tarihinde doluyor.`
      );
    });

  } catch (error) {
    console.error('Cron Job hatası:', error);
  }
});

// Sunucuyu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Sunucu http://localhost:${PORT} üzerinde çalışıyor.`);
});