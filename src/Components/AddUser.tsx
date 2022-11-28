import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


interface AddUser {
    username: string;
    contact: string;
    address: string;
    city: string;
  }
export default function AddUser() {

    const [users, setuser] = useState<AddUser>({ username: "", contact: "",address:"",city:"" });
  
  
 
    let navigate = useNavigate();

    let passData = (event: any):void=>{
      event.preventDefault();
        
        axios
        .post("http://localhost:4800/user", {
          username: users.username,
          contact: users.contact,
          address: users.address,
          city: users.city,
        })
        .then((res: any) => {
          console.log("res", res.data);
        
        })
     
      navigate('/viewuser')
    }
     
    
     

  return (
    <div>
        <p>Add User</p>
         <div className='for'  >

        <label className='lab'>Name</label>
        <input className='in'
          type="text"
          name='name'
          onChange={(e) => setuser({ ...users, username: e.target.value })}
         />
        <label className='lab'>Contact</label>
        <input className='in'
          type="text"
          name='contact'
      
          onChange={(e) => setuser({ ...users, contact: e.target.value })}
         />
        <label className='lab'>Address</label>
        <input className='in'
        name='address'
          type="text"
          
          onChange={(e) => setuser({ ...users, address: e.target.value })}
          />
        <label className='lab'>City</label>
        <input className='in'
          type="text"
          name='city'
        
          onChange={(e) => setuser({ ...users, city: e.target.value })}
          />
        <button className='but'  onClick={passData}>Adduser</button>
      </div>
    </div>
  );
  }
