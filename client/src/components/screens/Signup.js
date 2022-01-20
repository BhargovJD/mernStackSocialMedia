import React,{useState} from 'react';
// import {useHistory} from 'react-router-dom'

function Signup() {

  // const history = useHistory()

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const postData = ()=>{
    fetch("http://localhost:5000/signup",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name:name,
        password:password,
        email:email
      })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data)
      if(data.error){
        alert(data.error)
      }
      else{
        alert(data.message)
        // history.push('/login')
      }
    })
  }


  return <div className="container">

  <div className="row">
      <div className="col"></div>
      <div className="col">
        <form>
    <div className="mb-3">

    <label  className="form-label">Name</label>
      <input type="text" className="form-control" id="" aria-describedby="" value={name} onChange={(e)=>setName(e.target.value)}/>
   <br/>

      <label  className="form-label">Email address</label>
      <input type="text" className="form-control" id="" aria-describedby="" value={email} onChange={(e)=>setEmail(e.target.value)}/>

    </div>
    <div className="mb-3">
      <label  className="form-label">Password</label>
      <input type="text" className="form-control" id="" value={password} onChange={(e)=>setPassword(e.target.value)}/>
    </div>
    <div className="mb-3 form-check">

    </div>
    <button type="button" onClick={()=>{postData()}} className="btn btn-primary">Signup</button>
  </form></div>
      <div className="col"></div>
    </div>

    </div>;
}

export default Signup;
