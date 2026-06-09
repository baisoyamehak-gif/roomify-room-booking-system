const express = require('express');
const router = express.Router();
const { bulkUploadUsers, downloadTemplate } = require('../controllers/bulkUploadController');
const { protect, authorize } = require('../middleware/auth');

router.get('/template', downloadTemplate);

router.use(protect);
router.use(authorize('admin'));

router.post('/users', bulkUploadUsers);

module.exports = router;