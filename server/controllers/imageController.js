// imageUploadController.js
import fs from 'fs';

export const handleImageUpload = async (req, res) => {
  try {
    // The uploaded file information is available in req.file
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
