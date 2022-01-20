import React from 'react';

function Signup() {
  return <div class="container">

  <div class="row">
      <div class="col"></div>
      <div class="col"><form>
    <div class="mb-3">

    <label for="" class="form-label">Name</label>
      <input type="text" class="form-control" id="" aria-describedby=""/>
   <br/>

      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>

    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input type="text" class="form-control" id="exampleInputPassword1"/>
    </div>
    <div class="mb-3 form-check">
      {/* <input type="checkbox" class="form-check-input" id="exampleCheck1"/> */}
      {/* <label class="form-check-label" for="exampleCheck1">Check me out</label> */}
    </div>
    <button type="submit" class="btn btn-primary">Signup</button>
  </form></div>
      <div class="col"></div>
    </div>

    </div>;
}

export default Signup;
