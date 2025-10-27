<<<<<<< HEAD
import React, { useEffect,useState } from 'react';
=======
import React, { useEffect, useState, useCallback } from 'react';
>>>>>>> f5a76c9 (final commit)
import Card from 'react-bootstrap/Card';
import SmartNavbar from '../Navbar/SmartNavbar';
import Button from 'react-bootstrap/Button';
import './Menu.css'
<<<<<<< HEAD
import Badge from 'react-bootstrap/Badge';
=======
>>>>>>> f5a76c9 (final commit)
import { useAuth } from '../../context/AuthContext';

const Menu = () => {
    const [data,setData]=useState([])
<<<<<<< HEAD
    const [cartCount, setCartCount] = useState(0)
    const { user, token } = useAuth()
    
     function addToCart (id){  
        console.log('Add to cart called with ID:', id);
        console.log('User:', user);
        console.log('Token:', token ? 'Present' : 'Missing');
        
        if (!user) {
            alert('Please login to add items to cart')
            return
        }
        
        if (!token) {
            alert('Authentication token missing. Please login again.')
            return
        }
        
        const url="http://localhost:5000/api/cart"
        const params={
            method:'post',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                food_id: id
            })
        }
        
        console.log('Making request to:', url);
        console.log('Request params:', params);
        
        fetch(url, params)
        .then((res) => {
            console.log('Response status:', res.status);
            console.log('Response headers:', res.headers);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            console.log('Add to cart response:', data);
            if (data.message) {
                setCartCount(prev => prev + 1);
                alert('Item added to cart successfully!');
            } else if (data.error) {
                alert(`Error: ${data.error}`);
            }
        })
        .catch(err => {
            console.error('Error adding to cart:', err);
            console.error('Error details:', err.message);
            alert('Error adding item to cart. Please try again.');
        })
      }
     const fetchData=()=>{
      const url="http://localhost:5000/api/foods"
              const params={
              method:'get',
              headers:{
                  'Content-Type':'application/json'
              }
          }
          fetch(url,params).then((res)=>{
              return res.json()
          }).then((data)=>{
          console.log(data);
          setData(data)
          
      })
  }
    useEffect(()=>{
      fetchData();
  },[])
=======
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const { user, token } = useAuth()
    
     const buildImageUrl = (img) => {
       if (!img) return '';
       if (/^https?:\/\//i.test(img)) return img;
       if (img.startsWith('/')) return `http://localhost:5000${img}`;
       return `http://localhost:5000/${img}`;
     };

     async function addToCart (id){  
        try {
          if (!user) {
            alert('Please login to add items to cart');
            return;
          }
          if (!token) {
            alert('Authentication token missing. Please login again.');
            return;
          }
          const res = await fetch('http://localhost:5000/api/cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ food_id: id })
          });
          if (!res.ok) {
            const text = await res.text();
            let msg = `Failed to add to cart (${res.status})`;
            try { const j = JSON.parse(text); msg = j.error || j.message || msg; } catch(_){ msg = text || msg; }
            throw new Error(msg);
          }
          const data = await res.json();
          alert(data.message || 'Item added to cart successfully!');
        } catch (err) {
          console.error('Add to cart error:', err);
          alert(err.message || 'Error adding item to cart. Please try again.');
        }
      }
     const fetchData = useCallback(() =>{
      const url="http://localhost:5000/api/foods"
      const params={
        method:'get',
        headers:{
          'Content-Type':'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      }
      setLoading(true)
      setError('')
      fetch(url,params)
        .then((res)=>{
          if (!res.ok) throw new Error(`Failed to load menu (${res.status})`)
          return res.json()
        })
        .then((data)=>{
          console.log(data);
          setData(Array.isArray(data) ? data : [])
        })
        .catch((err)=>{
          console.error('Failed to fetch menu:', err)
          setError('Failed to load menu. Please try again later.')
        })
        .finally(()=> setLoading(false))
    }, [token])
    useEffect(()=>{
      fetchData();
    },[fetchData])
>>>>>>> f5a76c9 (final commit)

    return ( 

       <div>
            <SmartNavbar/>      
<<<<<<< HEAD
      <div className='menu'> 
          
      {data.map((f, index)=> { 
        return <Card key={index} className='card'> 
        <Card.Img variant="top" src={f.food_image} />
        <Badge bg="secondary">Huge Discounts</Badge>
=======
     <div className='menu'> 
      {loading && (
        <div style={{textAlign:'center', padding:'2rem'}}>Loading menu...</div>
      )}
      {!loading && error && (
        <div style={{textAlign:'center', color:'red', padding:'1rem'}}>{error}</div>
      )}
      {!loading && !error && data.length === 0 && (
        <div style={{textAlign:'center', padding:'2rem'}}>No items available.</div>
      )}
          
      {data.map((f, index)=> { 
        return <Card key={index} className='card'> 
        {f.food_image ? (
          <Card.Img variant="top" src={buildImageUrl(f.food_image)} />
        ) : null}
>>>>>>> f5a76c9 (final commit)
        <Card.Body>
          <Card.Title>{f.food_name}</Card.Title>
          <Card.Text>
           Price {f.food_price}/-
          </Card.Text>
          <Button variant="primary" onClick={()=>{addToCart(f._id)}}>Add to cart</Button>
        </Card.Body>
<<<<<<< HEAD
        <Card.Text>
        
        <div className="ratings">
          {f.ratings}
                <i class="fa fa-star rating-color"></i>
            </div> 
        </Card.Text>
      </Card>
         
         })}
=======
      </Card>
         
        })}
>>>>>>> f5a76c9 (final commit)
         
        </div>

      </div>
      
    );
};
export default Menu;