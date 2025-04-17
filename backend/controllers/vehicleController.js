const pool = require('../config/db');

const addVehicle = async (req, res) => {
  // 1. Yetki kontrolü (JWT'den user.id al)
  if (!req.userId) {
    return res.status(401).json({ error: "Yetkisiz erişim!" });
  }

  // 2. Veri validasyonu
  const { plateNumber, model, taxDueDate } = req.body;
  if (!plateNumber || !taxDueDate) {
    return res.status(400).json({ error: "Plaka ve vergi tarihi zorunludur!" });
  }

  // 3. Plaka format kontrolü (Opsiyonel)
  const plateRegex = /^(0[1-9]|[1-7][0-9]|8[01])([A-Z]{1,3})(\d{2,4})$/;
  if (!plateRegex.test(plateNumber)) {
    return res.status(400).json({ error: "Geçersiz plaka formatı!" });
  }

  try {
    // 4. Aynı plaka kontrolü
    const [existing] = await pool.query(
      'SELECT * FROM vehicles WHERE plate_number = ? AND user_id = ?',
      [plateNumber, req.userId]
    );
    
    if (existing.length > 0) {
      return res.status(400).json({ error: "Bu plaka zaten kayıtlı!" });
    }

    // 5. Veritabanına kaydet
    await pool.query(
      `INSERT INTO vehicles 
       (user_id, plate_number, model, road_tax_expiry) 
       VALUES (?, ?, ?, ?)`,
      [req.userId, plateNumber.toUpperCase(), model, taxDueDate]
    );

    res.status(201).json({ message: "Araç başarıyla eklendi!" });

  } catch (error) {
    console.error("Araç ekleme hatası:", error);
    res.status(500).json({ error: "Sunucu hatası!" });
  }
};

module.exports = { addVehicle };