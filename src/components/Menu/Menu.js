import React, { useEffect,useState } from 'react';
import Card from 'react-bootstrap/Card';
import SmartNavbar from '../Navbar/SmartNavbar';
import Button from 'react-bootstrap/Button';
import './Menu.css'
import Badge from 'react-bootstrap/Badge';
import { useAuth } from '../../context/AuthContext';

const Menu = () => {
    const [data,setData]=useState([])
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

    return ( 

       <div>
            <SmartNavbar/>      
      <div className='menu'> 
          
      {data.map((f, index)=> { 
        return <Card key={index} className='card'> 
        <Card.Img variant="top" src={f.food_image} />
        <Badge bg="secondary">Huge Discounts</Badge>
        <Card.Body>
          <Card.Title>{f.food_name}</Card.Title>
          <Card.Text>
           Price {f.food_price}/-
          </Card.Text>
          <Button variant="primary" onClick={()=>{addToCart(f._id)}}>Add to cart</Button>
        </Card.Body>
        <Card.Text>
        
        <div className="ratings">
          {f.ratings}
                <i class="fa fa-star rating-color"></i>
            </div> 
        </Card.Text>
      </Card>
         
         })}
         
        </div>

      </div>
      
    );
};
export default Menu;