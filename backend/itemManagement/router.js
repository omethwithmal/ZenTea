const express = require('express');
const router = express.Router();
const controller = require('./controller');
const multer = require('multer');
const path = require('path');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!require('fs').existsSync(uploadsDir)) {
    require('fs').mkdirSync(uploadsDir, { recursive: true });
}

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });

// Routes
router.post('/addItem', upload.single('image'), controller.addItem);
router.get('/getItem', controller.getItem);
router.put('/updateItem/:id', upload.single('image'), controller.updateItem);
router.delete('/deleteItem/:id', controller.deleteItem);

module.exports = router;
