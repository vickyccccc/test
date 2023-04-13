// import logo from './logo.svg';
// import './App.css';
import CourseList from './CourseList';
import Login from './Login';
import Signup from './Signup';
import UserList from './UserList';
import User from './User';
// import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div>
      <BrowserRouter> 
        <Routes>
          <Route path='/UserList' element={<UserList/>}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/CourseList' element={<CourseList/>}/>
          {/* <Route path='/Course' element={<Course/>}/> */}
          <Route path='/User' element={<User/>}/> 
          <Route path='*' element={<p>404 not found</p>}/> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
