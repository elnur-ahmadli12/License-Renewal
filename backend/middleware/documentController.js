const pool = require('../config/db');

exports.uploadDocument = async (req, res) => {
  try {
    const userId = req.user.id;
    const { filename, path } = req.file;

    // Veritabanına belge bilgilerini kaydet
    await pool.query(
      'INSERT INTO documents (user_id, file_name, file_path) VALUES (?, ?, ?)',
      [userId, filename, path]
    );

    res.json({ 
      success: true,
      message: 'Belge başarıyla yüklendi!',
      document: { filename, path }
    });
  } catch (error) {
    console.error("Belge yükleme hatası:", error);
    res.status(500).json({ error: "Sunucu hatası!" });
  }
};