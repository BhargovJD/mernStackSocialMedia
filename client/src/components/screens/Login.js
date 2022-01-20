import React from 'react';

function Login() {
  return <div className="container">

<div className="row">
    <div className="col"></div>
    <div className="col"><form>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>

  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="text" className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3 form-check">
    {/* <input type="checkbox" className="form-check-input" id="exampleCheck1"/> */}
    {/* <label className="form-check-label" for="exampleCheck1">Check me out</label> */}
  </div>
  <button type="submit" className="btn btn-primary">Login</button>
</form></div>
    <div className="col"></div>
  </div>

  </div>;
}

export default Login;
