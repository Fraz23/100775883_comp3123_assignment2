const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const employeeController = require('../controllers/employeeController');
const auth = require('../middleware/authMiddleware');

// Configure multer storage
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '..', 'uploads'));
	},
	filename: function (req, file, cb) {
		const unique = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
		cb(null, unique);
	}
});
const upload = multer({ storage });

// GET /api/v1/emp/employees (supports query params: department, position, q)
router.get('/employees', employeeController.getAllEmployees);

// POST /api/v1/emp/employees (protected)
router.post('/employees', auth, upload.single('image'), employeeController.createEmployee);

// GET /api/v1/emp/employees/:id
router.get('/employees/:id', employeeController.getEmployeeById);

// PUT /api/v1/emp/employees/:id (protected)
router.put('/employees/:id', auth, upload.single('image'), employeeController.updateEmployee);

// DELETE /api/v1/emp/employees?eid=xxx (protected)
router.delete('/employees', auth, employeeController.deleteEmployee);

module.exports = router;