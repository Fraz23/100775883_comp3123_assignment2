const mongoose = require('mongoose');
require('dotenv').config();
const Employee = require('../models/Employee');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/comp3123_assigment1';

const sampleEmployees = [
  { first_name: 'Alice', last_name: 'Wong', email: 'alice.wong@example.com', position: 'Developer', salary: 70000, date_of_joining: '2021-06-15', department: 'IT' },
  { first_name: 'Bob', last_name: 'Smith', email: 'bob.smith@example.com', position: 'Designer', salary: 65000, date_of_joining: '2020-09-01', department: 'Design' },
  { first_name: 'Carlos', last_name: 'Gomez', email: 'carlos.gomez@example.com', position: 'QA Engineer', salary: 60000, date_of_joining: '2019-11-20', department: 'QA' },
  { first_name: 'Diana', last_name: 'Lee', email: 'diana.lee@example.com', position: 'Product Manager', salary: 90000, date_of_joining: '2018-03-05', department: 'Product' },
  { first_name: 'Ethan', last_name: 'Brown', email: 'ethan.brown@example.com', position: 'DevOps Engineer', salary: 85000, date_of_joining: '2022-01-10', department: 'IT' },
  { first_name: 'Fatima', last_name: 'Khan', email: 'fatima.khan@example.com', position: 'HR Specialist', salary: 55000, date_of_joining: '2021-04-22', department: 'HR' },
  { first_name: 'George', last_name: 'Taylor', email: 'george.taylor@example.com', position: 'Support Engineer', salary: 48000, date_of_joining: '2020-07-12', department: 'Support' },
  { first_name: 'Hannah', last_name: 'Nguyen', email: 'hannah.nguyen@example.com', position: 'Business Analyst', salary: 72000, date_of_joining: '2019-02-28', department: 'Business' },
  { first_name: 'Ian', last_name: 'Patel', email: 'ian.patel@example.com', position: 'Software Architect', salary: 110000, date_of_joining: '2017-08-03', department: 'IT' },
  { first_name: 'Jane', last_name: 'Doe', email: 'jane.doe@example.com', position: 'Marketing Manager', salary: 78000, date_of_joining: '2018-12-11', department: 'Marketing' }
];

async function seed() {
  try {
    console.log('Connecting to', MONGODB_URI);
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    for (const emp of sampleEmployees) {
      const exists = await Employee.findOne({ email: emp.email });
      if (exists) {
        console.log(`Skipping existing: ${emp.email}`);
        continue;
      }
      const toInsert = {
        ...emp,
        image: null
      };
      await Employee.create(toInsert);
      console.log(`Inserted: ${emp.email}`);
    }

    console.log('Seeding complete.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();
