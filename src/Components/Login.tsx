import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';




interface Login{
 
  email: string;
  password: string;
  

}

export default function Login() {
  const [log, setlog] = useState<Login>({ email: "",password:"" });

  let navigate = useNavigate();
  const login = () => {
    axios.post("http://localhost:4800/login", {
    
      email: log.email,
      password: log.password,
    }).then((response) => {
      console.log('response',response.data)
      if(Object.keys(response.data).length > 0){
        alert(response.data?.message)
        localStorage.setItem('token',response.data?.token)
             navigate('/adduser')
      }
      else{
        alert('error')
      }
   });
};
  return (
    <div>
        <p>Login</p>
         <div className='for'>
        <label className='lab'>Email</label>
        <input className='in'
          type="email"
          value={log.email}
          onChange={(e) => setlog({ ...log, email: e.target.value })}/>
        
        
        
        <label className='lab'>Password</label>
        <input className='in'
          type="password"
          value={log.password}
          onChange={(e) => setlog({ ...log, password: e.target.value })}/>
            
             <button   className='but' onClick={login} >submit</button>
         </div>
    </div>
  )
}
