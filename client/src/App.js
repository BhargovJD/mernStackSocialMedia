import {BrowserRouter as Router, Routes, Route, Link, }  from 'react-router-dom'
import './App.css';


import Navbar from './components/Navbar';
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import Profile from './components/screens/Profile';
import CreatePost from './components/screens/CreatePost';
function App() {
  return (

    <div className="App">

<Router>
    <Navbar/>
    <Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/login" element={<Login/>} />
         <Route path="/signup" element={<Signup/>} />
         <Route path="/profile" element={<Profile/>} />
         <Route path="/create" element={<CreatePost/>} />

    </Routes>
</Router>

    </div>


  );
}

export default App;
