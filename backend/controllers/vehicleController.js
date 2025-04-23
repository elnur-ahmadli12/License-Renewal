const pool = require('../config/db');

// Araç Silme
exports.deleteVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const userId = req.userId; // Middleware'den gelen userId

    const [result] = await pool.query(
      'DELETE FROM vehicles WHERE id = ? AND user_id = ?',
      [vehicleId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Araç bulunamadı!" });
    }

    res.json({ message: "Araç silindi!" });
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).json({ error: "Sunucu hatası!" });
  }
};

// Araç Ekleme
exports.addVehicle = async (req, res) => {
  try {
    const { plateNumber, model, taxDueDate } = req.body;
    const userId = req.userId; // Middleware'den gelen userId

    // Validasyon
    if (!plateNumber || !taxDueDate) {
      return res.status(400).json({ error: "Plaka ve tarih zorunlu!" });
    }

    // Plaka format kontrolü (TR plaka regex)
    const plateRegex = /^(0[1-9]|[1-7][0-9]|8[01])(([A-Z])(\d{4,5})|([A-Z]{2})(\d{3,4})|([A-Z]{3})(\d{2,3}))$/;
    if (!plateRegex.test(plateNumber)) {
      return res.status(400).json({ error: "Geçersiz plaka!" });
    }

    // Aynı plaka kontrolü
    const [existing] = await pool.query(
      'SELECT * FROM vehicles WHERE plate_number = ? AND user_id = ?',
      [plateNumber, userId]
    );
    if (existing.length > 0) {
      return res.status(400).json({ error: "Plaka zaten kayıtlı!" });
    }

    // Veritabanına ekle
    await pool.query(
      'INSERT INTO vehicles (user_id, plate_number, model, road_tax_expiry) VALUES (?, ?, ?, ?)',
      [userId, plateNumber.toUpperCase(), model, taxDueDate]
    );

    res.status(201).json({ message: "Araç eklendi!" });
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).json({ error: "Sunucu hatası!" });
  }
};