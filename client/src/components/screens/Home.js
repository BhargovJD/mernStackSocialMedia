import React from 'react';

function Home() {
  return <div>



 <div className="container-fluid">

  <div className="row">

    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4" ></div>
    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 " >

    <div className="card" style={{width:"500px"}}>
    <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyo2vDh5-iAGaK1kmQvMqadwwxoZa3gCRxxw&usqp=CAU" alt="" />
    <div className="card-body">
    <svg xmlns="http://www.w3.org/2000/svg" style={{color:"red"}} width="20" height="20" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
</svg>
    <h4 className="card-title">John Doe</h4>
    <p className="card-text">Some example text some example text. John Doe is an architect and engineer</p>
    <div className="input-group mb-3">
  <input type="text" className="form-control" placeholder="add a comment" aria-label="Recipient's username" aria-describedby="button-addon2"/>
  <button className="btn btn-success" type="button" id="button-addon2">Submit</button>
</div>
    </div>
    </div>

    </div>
    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4" ></div>
  </div>


</div>

<hr></hr>

<div className="container-fluid">

<div className="row">

  <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4" ></div>
  <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 " >

  <div className="card" style={{width:"500px"}}>
  <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyo2vDh5-iAGaK1kmQvMqadwwxoZa3gCRxxw&usqp=CAU" alt="Card image" />
  <div className="card-body">
  <h4 className="card-title">John Doe</h4>
  <p className="card-text">Some example text some example text. John Doe is an architect and engineer</p>
  <div className="input-group mb-3">
<input type="text" className="form-control" placeholder="add a comment" aria-label="Recipient's username" aria-describedby="button-addon2"/>
<button className="btn btn-success" type="button" id="button-addon2">Submit</button>
</div>
  </div>
  </div>

  </div>
  <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4" ></div>
</div>


</div>
</div>
}

export default Home;
