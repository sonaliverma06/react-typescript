import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

interface AddUser {
  username: string;
  contact: string;
  address: string;
  city: string;
}

interface ViewUser {
  id: string;
  username: string;
  contact: string;
  address: string;
  city: string;
}

export default function ViewUser() {
  
  const [users, setuser] = useState<AddUser>({ username: "", contact: "",address:"",city:"" });
  const [viewuser, setviewuser] = useState<Array<any>>([]);
  const [toggle, setToggle] = useState<boolean>(false);
  const [ids, setIds] = useState<string>("");

  useEffect(() => {
    getviewData();
     }, []);


  function getviewData(): void {
    axios
      .get("http://localhost:4800/viewuser")
      .then((result: any) => {
        console.log("result", result.data.data);
        setviewuser(result.data.data);
      })
     
  }



  function handleSubmit(e: any): void {
    e.preventDefault();

    if (toggle) {
      axios
        .put(`http://localhost:4800/user/${ids}`, {
          username: users.username,
          contact: users.contact,
          address: users.address,
          city: users.city,
        })
        .then((res: any) => {
          console.log("res", res.data);
          setToggle(false);
          setuser({username: "", contact: "",address:"",city:"" });
          getviewData();
        })
        .catch((err: any) => {
          console.log("error", err);
        });
    } else {
      axios
        .post("http://localhost:4800/user", {
          username: users.username,
          contact: users.contact,
          address: users.address,
          city: users.city,
       
        })
        .then((res: any) => {
          console.log("res", res.data);
          getviewData();
        })
        .catch((err: any) => {
          console.log("error", err);
        });
    }
  }




     function onDelete(a: ViewUser): void {
      axios
        .delete(`http://localhost:4800/user/${a.id}`)
        .then((res: any) => {
          console.log("res", res.data);
          getviewData();
        })
     
    }
  


    function onUpdate(a: ViewUser): void {
      setuser({
       username: a.username,
        contact:  a.contact,
        address:  a.address,
           city:  a.city,
      });
      setIds(a.id);
      setToggle(true);
    }

  return (
    <div>
      <p>Add User</p>
         <form onSubmit={(e) => handleSubmit(e)} className='for'  >

        <label className='lab'>Name</label>
        <input className='in'
          type="text"
          name='name'
          value={users.username}
          onChange={(e) => setuser({ ...users, username: e.target.value })}
         />
        <label className='lab'>Contact</label>
        <input className='in'
          type="text"
          name='contact'
          value={users.contact}
          onChange={(e) => setuser({ ...users, contact: e.target.value })}
         />
        <label className='lab'>Address</label>
        <input className='in'
        name='address'
          type="text"
          value={users.address}
          onChange={(e) => setuser({ ...users, address: e.target.value })}
          />
        <label className='lab'>City</label>
        <input className='in'
          type="text"
          name='city'
          value={users.city}
          onChange={(e) => setuser({ ...users, city: e.target.value })}
       
          />
  <button type="submit">{toggle ? "edit" : "submit"}</button>
      </form>
      <div>

<table  className='table' id='tab' >
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">User Name</th>
      <th scope="col">contact</th>
      <th scope="col">Address</th>
      <th scope="col">city</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {
      viewuser?.map((item: any) =>(

      
    
    <tr>
      <th scope="row">{item.id}</th>
      <td>{item.username}</td>
      <td>{item.contact}</td>
      <td>{item.address}</td>
      <td>{item.city}</td>
    <td> 
    <Button variant="danger" onClick={() => onDelete(item)}>Delete</Button>{' '} 
    <Button variant="info" onClick={() =>onUpdate(item)}>update</Button>{' '} 
    </td>
    </tr>
      ))
    }
   
  </tbody>
</table>
</div>
    </div>
  )
}
