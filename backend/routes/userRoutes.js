const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authenticate = require('../middleware/authenticate');

router.get('/profile', authenticate, async (req, res) => {
  try {
    const [userRows] = await pool.query(
      'SELECT id, name, email FROM users WHERE id = ?', 
      [req.userId]
    );

    if (userRows.length === 0) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
    }

    const user = userRows[0];

    const [licenseRows] = await pool.query(
      'SELECT license_number, expiry_date FROM licenses WHERE user_id = ?',
      [req.userId]
    );

    const [vehicleRows] = await pool.query(
        'SELECT id, plate_number AS plate, model, road_tax_expiry AS tax_due FROM vehicles WHERE user_id = ?',
        [req.userId]
      );
    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      license: licenseRows[0] || null,
      vehicles: vehicleRows || []
    });

  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ success: false, error: 'Sunucu hatası' });
  }
});

// 👇 Bu satır da dosyanın sonunda olmalı
module.exports = router;
