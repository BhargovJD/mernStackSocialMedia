import React from 'react';

export default function CreatePost() {
  return <div>
      <div className="container-fluid">

  <div className="row">
    <div className="col-sm-4" ></div>
    <div className="col-sm-4" ><form>
  <div className="mb-3">
    <label for="" className="form-label">Title</label>
    <input type="text" placeholder='title' className="form-control" id="" aria-describedby=""/>
  </div>

  <div className="mb-3">
    <label for="" className="form-label">Body</label>
    <input type="text" placeholder='body' className="form-control" id="" aria-describedby=""/>
  </div>

  <div className="mb-3">
  <label for="formFileSm" className="form-label">Select a picture to upload</label>
  <input className="form-control form-control-sm" id="formFileSm" type="file"/>
</div>


  <button type="submit" className="btn btn-primary">Post</button>
</form>
</div>
    <div className="col-sm-4"></div>
  </div>
</div>

  </div>;
}
