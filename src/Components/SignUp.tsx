import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



interface SignUp {
  name:string
  email: string;
  password: string;
}
export default function SignUp() {
  const [addnewuser, setnewuser] = useState<SignUp>({ name: "", email: "",password:"" });
  const navigate = useNavigate();

  

  let passData = (event: any):void=>{
    event.preventDefault();

      axios
      .post("http://localhost:4800/signup", {
        name: addnewuser.name,
        email: addnewuser.email,
        password: addnewuser.password,
       
      })
      .then((res: any) => {
        console.log('res.data',res.data)
        const { token } = res.data;
        localStorage.setItem('token', token);
        localStorage.getItem('token');
         navigate('/login')
    })
    .catch(err => {
        if(err) { console.log(err) }
   
      })
    }

  return (
    <div>
          <p>SignUp</p>
         <div className='for'>
        <label className='lab'>Name</label>
        <input className='in'
          type="text"
          value={addnewuser.name}
          onChange={(e) => setnewuser({ ...addnewuser, name: e.target.value })}
         />

        <label className='lab'>Email</label>
        <input className='in'
          type="email"
          value={addnewuser.email}
          onChange={(e) => setnewuser({ ...addnewuser, email: e.target.value })}
         />
        <label className='lab'>Password</label>
        <input className='in'
          type="password"
          value={addnewuser.password}
          onChange={(e) => setnewuser({ ...addnewuser, password: e.target.value })}
         />
            <button className='but'  onClick={passData}>Sign Up</button>
         </div>
    </div>
  )
}
