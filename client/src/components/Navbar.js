import React,{useContext} from 'react';
import {BrowserRouter as Router, Routes, Route, Link, Navigate, }  from 'react-router-dom'
import { UserContext } from './../App';

import {useNavigate} from 'react-router-dom'


function Navbar() {
  const navigate = useNavigate()


  const {state,dispatch}=useContext(UserContext)

  const renderList = ()=>{
    if(state){
      return [
      <li className="nav-item">
      <a className="nav-link"><Link to="/profile">Profile</Link></a>
      </li>,

      <li className="nav-item">
      <a className="nav-link"><Link to="/create">Create a post</Link></a>
      </li>,

      <li>
      <button onClick={()=>{
        localStorage.clear()
        dispatch({type:"CLEAR"})
        navigate("/login")

      }} type="button" class="btn btn-danger">Logout</button>
      </li>
  ]
    }

    else{

      return[

      <li className="nav-item">
          <a className="nav-link"><Link to="/login">Login</Link></a>
        </li>,
        <li className="nav-item">
          <a className="nav-link"><Link to="/signup">Signup</Link></a>
        </li>


      ]

    }
  }
  return <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" ><Link to={state?"/":"login"}>PhotoSocial</Link></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">

        {renderList()}
      {/* <li className="nav-item">
          <a className="nav-link"><Link to="/login">Login</Link></a>
        </li>
        <li className="nav-item">
          <a className="nav-link"><Link to="/signup">Signup</Link></a>
        </li> */}
        {/* <li className="nav-item">
          <a className="nav-link"><Link to="/profile">Profile</Link></a>
        </li>

        <li className="nav-item">
          <a className="nav-link"><Link to="/create">Create a post</Link></a>
        </li> */}
      </ul>
      {/* <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
    </div>
  </div>
</nav>
  </div>;
}

export default Navbar;
