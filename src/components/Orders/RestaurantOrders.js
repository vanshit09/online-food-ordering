import React, { useEffect, useState, useCallback } from 'react';
import SmartNavbar from '../Navbar/SmartNavbar';
import { useAuth } from '../../context/AuthContext';

export default function RestaurantOrders(){
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const load = useCallback(async ()=>{
    setLoading(true); setError('');
    try{
      const res = await fetch('http://localhost:5000/api/orders/restaurant', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if(!res.ok){
        const t = await res.text();
        let msg = `Failed to load orders (${res.status})`;
        try{ const j = JSON.parse(t); msg = j.error || j.message || msg; }catch(_){ msg = t || msg; }
        throw new Error(msg);
      }
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    }catch(e){ setError(e.message || 'Failed to load orders'); }
    finally{ setLoading(false); }
  }, [token]);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (orderId, status) => {
    try{
      setUpdatingId(orderId);
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if(!res.ok){
        const t = await res.text();
        let msg = `Failed to update status (${res.status})`;
        try{ const j = JSON.parse(t); msg = j.error || j.message || msg; }catch(_){ msg = t || msg; }
        throw new Error(msg);
      }
      await res.json();
      await load();
    }catch(e){
      alert(e.message || 'Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div>
      <SmartNavbar/>
      <div style={{maxWidth: 900, margin: '20px auto', padding: '0 16px'}}>
        <h2>Incoming Orders</h2>
        {loading && <div>Loading...</div>}
        {error && <div style={{color: 'red'}}>{error}</div>}
        {!loading && !error && orders.length === 0 && (
          <div>No orders yet.</div>
        )}
        {!loading && !error && orders.length > 0 && (
          <div style={{display: 'grid', gap: 12}}>
            {orders.map(o => (
              <div key={o._id} style={{border:'1px solid #eee', borderRadius:8, padding:12, background:'#fff'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div><b>Order ID:</b> {o._id}</div>
                  <div style={{display:'flex', alignItems:'center', gap:8}}>
                    <span><b>Status:</b> {o.status}</span>
                    {!(o.status === 'delivered' || o.status === 'cancelled') && (
                      <>
                        <button
                          className="btn btn-sm btn-success"
                          disabled={updatingId === o._id}
                          onClick={()=> updateStatus(o._id, 'delivered')}
                        >
                          {updatingId === o._id ? 'Updating...' : 'Done'}
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          disabled={updatingId === o._id}
                          onClick={()=> updateStatus(o._id, 'cancelled')}
                        >
                          {updatingId === o._id ? 'Updating...' : 'Cancelled'}
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div style={{marginTop:8}}>
                  <b>Items:</b>
                  <ul style={{margin:'6px 0 0 16px'}}>
                    {(o.items || []).map((it, idx) => (
                      <li key={idx}>{it.name} x {it.quantity} — ₹{it.price}</li>
                    ))}
                  </ul>
                </div>
                <div style={{marginTop:8}}><b>Total:</b> ₹{o.total_amount}</div>
                <div style={{fontSize:12, color:'#666', marginTop:6}}>Placed on {new Date(o.createdAt).toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
