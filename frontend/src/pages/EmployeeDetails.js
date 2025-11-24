import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

export default function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/emp/employees/${id}`).then(res => setEmployee(res.data)).catch(err => console.error(err));
  }, [id]);

  if (!employee) return <div style={{ padding: 20 }}>Loading...</div>;

  const imgSrc = (process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1').replace('/api/v1','') + (employee.image || '');
  return (
    <div className="container app-container">
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <div>
              {employee.image ? <img src={imgSrc} alt="profile" className="img-thumbnail me-3" style={{ width: 160 }} /> : <div className="border rounded p-4 text-muted">No image</div>}
            </div>
            <div>
              <h3>{employee.first_name} {employee.last_name}</h3>
              <p className="mb-1"><strong>Email:</strong> {employee.email}</p>
              <p className="mb-1"><strong>Position:</strong> {employee.position}</p>
              <p className="mb-1"><strong>Department:</strong> {employee.department}</p>
              <p className="mb-1"><strong>Date of Joining:</strong> {employee.date_of_joining ? employee.date_of_joining.split('T')[0] : ''}</p>
              <div className="mt-3">
                <button className="btn btn-primary me-2" onClick={() => navigate(`/employees/${id}/edit`)}>Edit</button>
                <button className="btn btn-secondary" onClick={() => navigate('/employees')}>Back</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
