const Employee = require('../models/Employee');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// GET /api/v1/emp/employees
// Supports query params: department, position, q (search across name/email)
const getAllEmployees = async (req, res) => {
    try {
        const { department, position, q } = req.query;
        const query = {};
        if (department) query.department = department;
        if (position) query.position = position;
        if (q) {
            const re = new RegExp(q, 'i');
            query.$or = [
                { first_name: re },
                { last_name: re },
                { email: re },
                { position: re },
                { department: re }
            ];
        }

        const employees = await Employee.find(query);
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ 
            status: false, 
            message: 'Error fetching employees', 
            error: error.message 
        });
    }
};

// POST /api/v1/emp/employees
const createEmployee = async (req, res) => {
    try {
        const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

        // Check if employee already exists
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ 
                status: false, 
                message: 'Employee already exists with this email' 
            });
        }

        // Build employee payload
        const payload = {
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department
        };

        if (req.file) {
            payload.image = `/uploads/${req.file.filename}`;
        }

        // Create new employee
        const employee = new Employee(payload);
        await employee.save();

        res.status(201).json({
            message: 'Employee created successfully.',
            employee_id: employee._id
        });
    } catch (error) {
        res.status(500).json({ 
            status: false, 
            message: 'Error creating employee', 
            error: error.message 
        });
    }
};

// GET /api/v1/emp/employees/:id
const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ 
                status: false, 
                message: 'Invalid employee ID' 
            });
        }

        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ 
                status: false, 
                message: 'Employee not found' 
            });
        }

        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ 
            status: false, 
            message: 'Error fetching employee', 
            error: error.message 
        });
    }
};

// PUT /api/v1/emp/employees/:id
const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ 
                status: false, 
                message: 'Invalid employee ID' 
            });
        }

        const updatePayload = { ...req.body, updated_at: Date.now() };

        // If new file uploaded, remove previous file (if any) after updating
        if (req.file) {
            updatePayload.image = `/uploads/${req.file.filename}`;

            // Find current employee to remove old image file
            const current = await Employee.findById(id);
            if (current && current.image) {
                try {
                    const filename = current.image.replace(/^\/?uploads\//, '');
                    const filepath = path.join(__dirname, '..', 'uploads', filename);
                    if (fs.existsSync(filepath)) {
                        fs.unlinkSync(filepath);
                    }
                } catch (err) {
                    console.error('Failed to remove old image file:', err.message);
                }
            }
        }

        const employee = await Employee.findByIdAndUpdate(
            id,
            updatePayload,
            { new: true, runValidators: true }
        );

        if (!employee) {
            return res.status(404).json({ 
                status: false, 
                message: 'Employee not found' 
            });
        }

        res.status(200).json({
            message: 'Employee details updated successfully.'
        });
    } catch (error) {
        res.status(500).json({ 
            status: false, 
            message: 'Error updating employee', 
            error: error.message 
        });
    }
};

// DELETE /api/v1/emp/employees?eid=xxx
const deleteEmployee = async (req, res) => {
    try {
        const { eid } = req.query;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(eid)) {
            return res.status(400).json({ 
                status: false, 
                message: 'Invalid employee ID' 
            });
        }

        const employee = await Employee.findByIdAndDelete(eid);
        if (!employee) {
            return res.status(404).json({ 
                status: false, 
                message: 'Employee not found' 
            });
        }

        // Remove image file from disk if present
        if (employee.image) {
            try {
                const filename = employee.image.replace(/^\/?uploads\//, '');
                const filepath = path.join(__dirname, '..', 'uploads', filename);
                if (fs.existsSync(filepath)) {
                    fs.unlinkSync(filepath);
                }
            } catch (err) {
                console.error('Failed to remove image file on delete:', err.message);
            }
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ 
            status: false, 
            message: 'Error deleting employee', 
            error: error.message 
        });
    }
};

module.exports = {
    getAllEmployees,
    createEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};