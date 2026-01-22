const express = require('express');
const router = express.Router();
const cloudinary = require('../utils/cloudinary');

router.post('/', async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) return res.status(400).json({ error: 'Nenhuma imagem enviada.' });
    // Upload base64 para Cloudinary
    const uploadRes = await cloudinary.uploader.upload(image, {
      folder: 'mercadocidade',
      resource_type: 'image',
    });
    res.json({ url: uploadRes.secure_url });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao enviar imagem', details: err.message });
  }
});

module.exports = router;
