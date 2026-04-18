const express = require('express');
const PortfolioData = require('../models/PortfolioData');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const mongoose = require('mongoose');

const uploadDirectory = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDirectory),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, '-').toLowerCase();
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// GET all data
router.get('/data', async (req, res) => {
  try {
    let data = await PortfolioData.findOne();
    if (!data) {
      data = new PortfolioData();
      await data.save();
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE personal info
router.put('/personal-info', async (req, res) => {
  try {
    let data = await PortfolioData.findOne();
    if (!data) {
      data = new PortfolioData();
    }
    data.personalInfo = { ...data.personalInfo, ...req.body };
    await data.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ADD skill
router.post('/skills', async (req, res) => {
  try {
    let data = await PortfolioData.findOne();
    if (!data) {
      data = new PortfolioData();
    }
    const newSkill = {
      _id: new mongoose.Types.ObjectId(),
      ...req.body,
    };
    data.skills.push(newSkill);
    await data.save();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE skill
router.delete('/skills/:id', async (req, res) => {
  try {
    let data = await PortfolioData.findOne();
    if (!data) {
      return res.status(404).json({ error: 'Data not found' });
    }
    data.skills = data.skills.filter((skill) => skill._id.toString() !== req.params.id);
    await data.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE skills
router.put('/skills', async (req, res) => {
  try {
    let data = await PortfolioData.findOne();
    if (!data) {
      data = new PortfolioData();
    }

    console.log('Updating skills with:', req.body);
    console.log('Updating skills data:', data);
    data.skills = req.body;
    await data.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ADD portfolio item
router.post('/portfolio', async (req, res) => {
  try {
    let data = await PortfolioData.findOne();
    if (!data) {
      data = new PortfolioData();
    }
    const newItem = {
      _id: new mongoose.Types.ObjectId(),
      ...req.body,
    };
    data.portfolio.push(newItem);
    await data.save();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE portfolio item
router.delete('/portfolio/:id', async (req, res) => {
  try {
    let data = await PortfolioData.findOne();
    if (!data) {
      return res.status(404).json({ error: 'Data not found' });
    }
    data.portfolio = data.portfolio.filter((item) => item._id.toString() !== req.params.id);
    await data.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE portfolio
router.put('/portfolio', async (req, res) => {
  try {
    let data = await PortfolioData.findOne();
    if (!data) {
      data = new PortfolioData();
    }
    data.portfolio = req.body;
    await data.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ADD experience
router.post('/experience', async (req, res) => {
  try {
    let data = await PortfolioData.findOne();
    if (!data) {
      data = new PortfolioData();
    }
    const newExp = {
      _id: new mongoose.Types.ObjectId(),
      ...req.body,
    };
    data.experience.push(newExp);
    await data.save();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE experience
router.delete('/experience/:id', async (req, res) => {
  try {
    let data = await PortfolioData.findOne();
    if (!data) {
      return res.status(404).json({ error: 'Data not found' });
    }
    data.experience = data.experience.filter((exp) => exp._id.toString() !== req.params.id);
    await data.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE experience
router.put('/experience', async (req, res) => {
  try {
    let data = await PortfolioData.findOne();
    if (!data) {
      data = new PortfolioData();
    }
    data.experience = req.body;
    await data.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ADD education
router.post('/education', async (req, res) => {
  try {
    let data = await PortfolioData.findOne();
    if (!data) {
      data = new PortfolioData();
    }
    const newEdu = {
      _id: new mongoose.Types.ObjectId(),
      ...req.body,
    };
    data.education.push(newEdu);
    await data.save();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE education
router.delete('/education/:id', async (req, res) => {
  try {
    let data = await PortfolioData.findOne();
    if (!data) {
      return res.status(404).json({ error: 'Data not found' });
    }
    data.education = data.education.filter((edu) => edu._id.toString() !== req.params.id);
    await data.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE education
router.put('/education', async (req, res) => {
  try {
    let data = await PortfolioData.findOne();
    if (!data) {
      data = new PortfolioData();
    }
    data.education = req.body;
    await data.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ADD certificate
router.post('/certificates', async (req, res) => {
  try {
    let data = await PortfolioData.findOne();
    if (!data) {
      data = new PortfolioData();
    }
    const newCert = {
      _id: new mongoose.Types.ObjectId(),
      ...req.body,
    };
    data.certificates.push(newCert);
    await data.save();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE certificate
router.delete('/certificates/:id', async (req, res) => {
  try {
    let data = await PortfolioData.findOne();
    if (!data) {
      return res.status(404).json({ error: 'Data not found' });
    }
    data.certificates = data.certificates.filter((cert) => cert._id.toString() !== req.params.id);
    await data.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE certificates
router.put('/certificates', async (req, res) => {
  try {
    let data = await PortfolioData.findOne();
    if (!data) {
      data = new PortfolioData();
    }
    data.certificates = req.body;
    await data.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// VERIFY password
router.post('/verify-password', async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ error: 'Password required' });
    }

    let data = await PortfolioData.findOne();
    if (!data) {
      data = new PortfolioData();
      await data.save();
    }

    if (data.adminPassword === password) {
      res.status(200).json({ authenticated: true });
    } else {
      res.status(401).json({ authenticated: false, error: 'Invalid password' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CHANGE password
router.post('/change-password', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Both passwords required' });
    }

    if (newPassword.length !== 4 || !/^\d+$/.test(newPassword)) {
      return res.status(400).json({ error: 'New password must be 4 digits' });
    }

    let data = await PortfolioData.findOne();
    if (!data) {
      data = new PortfolioData();
      await data.save();
    }

    if (data.adminPassword !== currentPassword) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    data.adminPassword = newPassword;
    await data.save();
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPLOAD image asset
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(201).json({ url: imageUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// RESET data to default
router.post('/reset', async (req, res) => {
  try {
    await PortfolioData.deleteMany({});
    const newData = new PortfolioData();
    await newData.save();
    res.status(200).json({ message: 'Data reset to default', data: newData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
