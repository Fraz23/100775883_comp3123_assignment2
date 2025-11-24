import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [q, setQ] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const params = {};
      if (q) params.q = q;
      if (department) params.department = department;
      if (position) params.position = position;
      const res = await api.get('/emp/employees', { params });
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchEmployees(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this employee?')) return;
    try {
      await api.delete(`/emp/employees?eid=${id}`);
      fetchEmployees();
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  return (
    <div className="container app-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Employees</h2>
        <div>
          <button className="btn btn-primary me-2" onClick={() => navigate('/employees/new')}>Add Employee</button>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4 mb-2">
          <input className="form-control" placeholder="Search by name or email..." value={q} onChange={e => setQ(e.target.value)} />
        </div>
        <div className="col-md-3 mb-2">
          <input className="form-control" placeholder="Department" value={department} onChange={e => setDepartment(e.target.value)} />
        </div>
        <div className="col-md-3 mb-2">
          <input className="form-control" placeholder="Position" value={position} onChange={e => setPosition(e.target.value)} />
        </div>
        <div className="col-md-2 mb-2">
          <button className="btn btn-outline-secondary w-100" onClick={fetchEmployees}>Search</button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Department</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp._id}>
                <td>{emp.first_name} {emp.last_name}</td>
                <td>{emp.email}</td>
                <td>{emp.position}</td>
                <td>{emp.department}</td>
                <td>{emp.image ? <img src={(process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1').replace('/api/v1','') + emp.image} alt="profile" className="img-thumbnail" style={{ width: 60 }} /> : '—'}</td>
                <td>
                  <Link className="btn btn-sm btn-outline-primary me-2" to={`/employees/${emp._id}`}>View</Link>
                  <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => navigate(`/employees/${emp._id}/edit`)}>Edit</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(emp._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
