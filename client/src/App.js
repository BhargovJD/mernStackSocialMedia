import {BrowserRouter as Router, Routes, Route, Link, }  from 'react-router-dom'
import './App.css';
import { useEffect, createContext,Switch,useReducer,useContext } from 'react';
import {useNavigate} from 'react-router-dom'
// const navigate = useNavigate()
// navigate('/')

import {reducer,initialState} from './reducers/userReducer'


import Navbar from './components/Navbar';
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import Profile from './components/screens/Profile';
import CreatePost from './components/screens/CreatePost';

export const UserContext = createContext()


const Routing = ()=>{
  const navigate = useNavigate()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER", payload:user})
      // navigate('/')
    }
    else{
      navigate('/login')
    }
  },[])

  return(

    <switch>
      <Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/login" element={<Login/>} />
         <Route path="/signup" element={<Signup/>} />
         <Route path="/profile" element={<Profile/>} />
         <Route path="/create" element={<CreatePost/>} />

    </Routes>
    </switch>

  )

}


function App() {

  const [state,dispatch]= useReducer(reducer,initialState)
  return (

    <UserContext.Provider value={{state,dispatch}}>

<div className="App">

<Router>
    <Navbar/>
    {/* <Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/login" element={<Login/>} />
         <Route path="/signup" element={<Signup/>} />
         <Route path="/profile" element={<Profile/>} />
         <Route path="/create" element={<CreatePost/>} />

    </Routes> */}

    <Routing/>
</Router>

    </div>

    </UserContext.Provider>




  );
}

export default App;
