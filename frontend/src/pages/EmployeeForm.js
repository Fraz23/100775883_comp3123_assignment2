import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function EmployeeForm() {
  const { id } = useParams();
  const isEdit = Boolean(id && id !== 'new');
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', position: '', salary: '', date_of_joining: '', department: '' });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      api.get(`/emp/employees/${id}`).then(res => setForm(res.data)).catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    // basic client-side validation
    const required = ['first_name','last_name','email','position','department'];
    const missing = required.filter(k => !form[k]);
    if (missing.length) {
      return alert('Please fill required fields: ' + missing.join(', '));
    }
    try {
      const fd = new FormData();
      Object.keys(form).forEach(k => { if (form[k] !== undefined) fd.append(k, form[k]); });
      if (file) fd.append('image', file);

      if (isEdit) {
        await api.put(`/emp/employees/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await api.post('/emp/employees', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      navigate('/employees');
    } catch (err) {
      console.error(err);
      alert('Save failed');
    }
  };
  return (
    <div className="container app-container">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title">{isEdit ? 'Edit' : 'Add'} Employee</h3>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">First Name *</label>
                <input name="first_name" className="form-control" value={form.first_name || ''} onChange={handleChange} />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Last Name *</label>
                <input name="last_name" className="form-control" value={form.last_name || ''} onChange={handleChange} />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Email *</label>
              <input name="email" className="form-control" value={form.email || ''} onChange={handleChange} />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Position *</label>
                <input name="position" className="form-control" value={form.position || ''} onChange={handleChange} />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Salary</label>
                <input name="salary" className="form-control" value={form.salary || ''} onChange={handleChange} />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Date of Joining</label>
                <input type="date" name="date_of_joining" className="form-control" value={form.date_of_joining ? form.date_of_joining.split('T')[0] : ''} onChange={handleChange} />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Department *</label>
                <input name="department" className="form-control" value={form.department || ''} onChange={handleChange} />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Profile Image</label>
              <input type="file" className="form-control" onChange={e => setFile(e.target.files[0])} />
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/employees')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
