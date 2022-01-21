import React,{useState,useContext} from 'react';
import {useNavigate} from 'react-router-dom'
import {UserContext} from '../../App'

function Login() {
  const {state,dispatch} = useContext(UserContext)
  const navigate = useNavigate()

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const postData = ()=>{
    fetch("http://localhost:5000/signin",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
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
        alert('Successfully logged in')
        localStorage.setItem("jwt",data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
        dispatch({type:"USER",payload:data.user})
        navigate('/')
      }
    }).catch(err=>{
      console.log(err)
    })
  }
  return <div className="container">

<div className="row">
    <div className="col"></div>
    <div className="col"><form>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  value={email} onChange={(e)=>setEmail(e.target.value)}/>

  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="text" className="form-control" id="exampleInputPassword1" value={password} onChange={(e)=>setPassword(e.target.value)}/>
  </div>
  <div className="mb-3 form-check">
    {/* <input type="checkbox" className="form-check-input" id="exampleCheck1"/> */}
    {/* <label className="form-check-label" for="exampleCheck1">Check me out</label> */}
  </div>
  <button type="button" onClick={()=>{postData()}} className="btn btn-primary">Login</button>
</form></div>
    <div className="col"></div>
  </div>

  </div>;
}

export default Login;
