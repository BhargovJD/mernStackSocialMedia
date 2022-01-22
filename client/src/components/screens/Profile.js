import React,{useState,useEffect,useContext} from 'react';
import { UserContext } from './../../App';

export default function Profile() {
  const [data,setData] = useState([])
  const {state, dispatch} = useContext(UserContext)

  useEffect(()=>{
    fetch('http://localhost:5000/mypost',{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        setData(result.myposts)
    })
 },[])

  return <div>
    <br></br>
      <div className="container-fluid">
  <div className="row">
  {/* <div className="col-sm-4"><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyo2vDh5-iAGaK1kmQvMqadwwxoZa3gCRxxw&usqp=CAU' className="img-fluid rounded" alt="..." style={{width:"160px",height:"160px"}}/>
</div> */}
  <div className="col-sm-4">
    <h5>{state?state.name:"loading..."}</h5>
    {/* <span>80 posts</span> <span>200 followers</span> <span>100 following</span> */}
    </div>
  {/* <div className="col-sm-4">settings</div> */}
  </div>
</div>

<hr></hr>

<div className="container-fluid">
  <div className="row">

    {
      data.map(i=>{
        return (
          <div className="col-sm-4"><img src={i.photo} className="img-fluid rounded" alt="..." style={{width:"350px",height:"300px"}}/></div>
        )
      })
    }

  </div>
</div>

  </div>;
}
