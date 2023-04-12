// import logo from './logo.svg';
// import './App.css';
import CourseList from './CourseList';
import Login from './Login';
import Signup from './Signup';
import UserList from './UserList';
// import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<UserList/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/courseList' element={<CourseList/>}/>
          <Route path='*' element={<p>404 not found</p>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
