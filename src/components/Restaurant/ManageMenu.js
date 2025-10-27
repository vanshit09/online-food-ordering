import React, { useEffect, useState, useCallback } from 'react';
import SmartNavbar from '../Navbar/SmartNavbar';
import { useAuth } from '../../context/AuthContext';
import { Modal, Button, Toast, ToastContainer, Form } from 'react-bootstrap';

const API_BASE = 'http://localhost:5000';

const initialForm = {
  name: '',
  price: '',
  description: '',
  is_available: true,
  image: null,
};

export default function ManageMenu() {
  const { token } = useAuth();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', bg: 'success' });
  const [showManage, setShowManage] = useState(false);

  const buildImageUrl = (img) => {
    if (!img) return '';
    // If already absolute
    if (/^https?:\/\//i.test(img)) return img;
    // If server-relative path like /images/...
    if (img.startsWith('/')) return `${API_BASE}${img}`;
    // Fallback
    return `${API_BASE}/${img}`;
  };

  const loadMyFoods = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/restaurants/me/foods`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      if (!res.ok) {
        const text = await res.text();
        let msg = text || `Failed to fetch foods (${res.status})`;
        try {
          const j = JSON.parse(text);
          msg = j.message || msg;
        } catch(_) {}
        throw new Error(msg);
      }
      const data = await res.json();
      const arr = Array.isArray(data) ? data : [];
      setFoods(arr);
      setShowManage(arr.length === 0);
    } catch (e) {
      setError(e.message || 'Failed to load menu');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { loadMyFoods(); }, [loadMyFoods]);

  const onChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setForm(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setForm(prev => ({ ...prev, image: files && files[0] ? files[0] : null }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('name', form.name);
      fd.append('price', String(form.price));
      fd.append('description', form.description);
      fd.append('is_available', String(form.is_available));
      if (form.image) fd.append('image', form.image);

      const isEditing = !!editingId;
      const url = isEditing
        ? `${API_BASE}/api/restaurants/me/foods/${editingId}`
        : `${API_BASE}/api/restaurants/me/foods`;

      const res = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: fd,
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || 'Request failed');
      }

      await loadMyFoods();
      if (isEditing) {
        setToast({ show: true, message: 'Item updated successfully', bg: 'success' });
        setShowEdit(false);
      } else {
        setToast({ show: true, message: 'Item created successfully', bg: 'success' });
        resetForm();
      }
    } catch (e) {
      setError(e.message || 'Failed to submit');
      setToast({ show: true, message: e.message || 'Failed to submit', bg: 'danger' });
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (food) => {
    setEditingId(food._id);
    setForm({
      name: food.food_name || '',
      price: food.food_price || '',
      description: food.description || '',
      is_available: !!food.is_available,
      image: null,
    });
    setShowEdit(true);
  };

  const delFood = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/restaurants/me/foods/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Delete failed');
      await loadMyFoods();
      setToast({ show: true, message: 'Item deleted', bg: 'success' });
    } catch (e) {
      setError(e.message || 'Delete failed');
      setToast({ show: true, message: e.message || 'Delete failed', bg: 'danger' });
    }
  };

  return (
    <div>
      <SmartNavbar />
      <div style={{ maxWidth: 1100, margin: '24px auto', padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <h2 style={{ margin: 0 }}>Manage Menu</h2>
          {loading && <span style={{ color: '#888', fontSize: 14 }}>(Loading...)</span>}
        </div>

        {error && (
          <div style={{ background: '#fff3f3', color: '#b40000', border: '1px solid #f1c0c0', padding: 12, borderRadius: 8, marginBottom: 16 }}>
            {error}
            {(error.toLowerCase().includes('invalid') || error.toLowerCase().includes('expired')) && (
              <div style={{ marginTop: 6, fontSize: 13 }}>
                Please logout and login again. If the issue persists, ensure the backend ACCESS_TOKEN is consistent and the server was restarted.
              </div>
            )}
          </div>
        )}

        {showManage ? (
          <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.06)', padding: 16, marginBottom: 24 }}>
            <h4 style={{ marginTop: 0, marginBottom: 12 }}>Create New Item</h4>
            <Form onSubmit={submitForm}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control name="name" value={form.name} onChange={onChange} required placeholder="Item name" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control name="price" type="number" min="0" step="0.01" value={form.price} onChange={onChange} required placeholder="Price" />
                </Form.Group>
                <Form.Group style={{ gridColumn: '1 / span 2' }}>
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={onChange} placeholder="Description" />
                </Form.Group>
                <Form.Group style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Form.Check type="checkbox" id="is_available" name="is_available" checked={form.is_available} onChange={onChange} label="Available" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Image</Form.Label>
                  <Form.Control type="file" name="image" accept="image/*" onChange={onChange} />
                </Form.Group>
              </div>
              <div style={{ marginTop: 16 }}>
                <Button type="submit" variant="primary" disabled={submitting}>Create Item</Button>
              </div>
            </Form>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
            <Button variant="primary" onClick={() => setShowManage(true)}>Manage Menu</Button>
          </div>
        )}

        <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.04)', padding: 16 }}>
          <h4 style={{ marginTop: 0 }}>Your Items</h4>
          {loading ? (
            <div>Loading your items...</div>
          ) : foods.length === 0 ? (
            <div>No items created yet.</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: 10 }}>Image</th>
                  <th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: 10 }}>Name</th>
                  <th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: 10 }}>Price</th>
                  <th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: 10 }}>Available</th>
                  <th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: 10 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {foods.map(f => (
                  <tr key={f._id}>
                    <td style={{ padding: 10 }}>
                      {f.food_image ? (
                        <img src={buildImageUrl(f.food_image)} alt={f.food_name} style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }} />
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                    <td style={{ padding: 10 }}>{f.food_name}</td>
                    <td style={{ padding: 10 }}>₹{f.food_price}</td>
                    <td style={{ padding: 10 }}>{f.is_available ? 'Yes' : 'No'}</td>
                    <td style={{ padding: 10 }}>
                      <Button size="sm" variant="outline-secondary" onClick={() => startEdit(f)}>Edit</Button>
                      <Button size="sm" variant="outline-danger" style={{ marginLeft: 8 }} onClick={() => delFood(f._id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitForm}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" value={form.name} onChange={onChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control name="price" type="number" min="0" step="0.01" value={form.price} onChange={onChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={onChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" id="is_available_modal" name="is_available" checked={form.is_available} onChange={onChange} label="Available" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="image" accept="image/*" onChange={onChange} />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={() => setShowEdit(false)} className="me-2">Cancel</Button>
              <Button type="submit" variant="primary" disabled={submitting}>Save Changes</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Toasts */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast bg={toast.bg} onClose={() => setToast({ ...toast, show: false })} show={toast.show} delay={2500} autohide>
          <Toast.Body style={{ color: toast.bg === 'danger' ? '#fff' : '#000' }}>{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
