import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom'


export default function CreatePost() {
  const navigate = useNavigate()

  const [title,setTitle] = useState("")
  const [body,setBody] = useState("")
  const [image,setImage] = useState("")
  const [url,setUrl] = useState("")


  useEffect(()=>{
    if(url){


    fetch("http://localhost:5000/createpost",{
      method:"post",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        title:title,
        body:body,
        url:url
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        alert(data.error)
      }
      else{
        alert('Created post successfully!')
        navigate('/')
      }
    }).catch(err=>{
      console.log(err)
    })
    }

  },[url])


  const postDetails = ()=>{
    const data = new FormData()

    data.append("file", image)
    data.append("upload_preset","insta_clone")
    data.append("cloud_name","dmq6h2h7y")
    fetch("https://api.cloudinary.com/v1_1/dmq6h2h7y/image/upload",{
      method:"post",
      body:data
    }).then(res=>res.json())
    .then(data=>{
      // console.log(data)
      setUrl(data.secure_url)
    })
    .catch(err=>{
      console.log(err)
    })



  }

  return <div>
      <div className="container-fluid">

  <div className="row">
    <div className="col-sm-4" ></div>
    <div className="col-sm-4" ><form>
  <div className="mb-3">
    <label for="" className="form-label">Title</label>
    <input type="text" placeholder='title' className="form-control" id="" aria-describedby="" value={title} onChange={(e)=>setTitle(e.target.value)}/>
  </div>

  <div className="mb-3">
    <label for="" className="form-label">Body</label>
    <input type="text" placeholder='body' className="form-control" id="" aria-describedby="" value={body} onChange={(e)=>setBody(e.target.value)}/>
  </div>

  <div className="mb-3">
  <label for="formFileSm" className="form-label">Select a picture to upload</label>
  <input className="form-control form-control-sm" id="formFileSm" type="file"  onChange={(e)=>setImage(e.target.files[0])}/>
</div>


  <button onClick={()=>postDetails()} type="button" className="btn btn-primary">Post</button>
</form>
</div>
    <div className="col-sm-4"></div>
  </div>
</div>

  </div>;
}
