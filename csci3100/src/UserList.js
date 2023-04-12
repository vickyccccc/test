import React from 'react'
import './UserList.css'
// import styles from './UserList.module.css' // video 11
import { useState } from 'react'
import Axios from "axios";
import editlogo from './logo/Edit.png'
import deletelogo from './logo/Delete.png'
import morelogo from './logo/More.png'
import updatelogo from './logo/Update.png'
import searchlogo from './logo/Search.png'
import addlogo from './logo/AddUser.png'

export default function UserList() {

  const [userID, setUserID] = useState(0);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [studyYear, setStudyYear] = useState(0);
  const [major, setMajor] = useState("");
  const [age, setAge] = useState(0);
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [newStudyYear, setNewStudyYear] = useState(0);
  const [newMajor, setNewMajor] = useState("");
  const [newAge, setNewAge] = useState(0);

  const [userList, setUserList] = useState([]);

  const [keyword, setKeyword] = useState("");

  const [courseList, setCourseList] = useState([]);

  const addUser = () => {
    Axios.post("http://localhost:8800/createuser", {
      userID: userID,  
      password: password,
      name: name,
      studyYear: studyYear,
      major: major,
      age: age,
    }).then(() => {
      setUserList([
        ...userList,
        {
          userID: userID,  
          password: password,
          name: name,
          studyYear: studyYear,
          major: major,
          age: age,
        },
      ]);
    })
  };

  const getUser = () => {
    if (keyword.trim() === '') {
      Axios.get('http://localhost:8800/user').then((response) => {
        setUserList(response.data);
      // })
      // .catch((error) => {
      //   console.error(error);
      });
    } else {
      Axios.get('http://localhost:8800/userbyid', { params: { keyword: keyword } }).then((response) => {
        setUserList(response.data);
      // })
      // .catch((error) => {
      //   console.error(error);
      });
    }
  };
  const getUserCourse = (userID) => {
    Axios.get('http://localhost:8800/usercourse', { params: { userID: userID } }).then((response) => {
      setCourseList(response.data);
    });
  };

  const updateUserName = (userID) => {
    Axios.put("http://localhost:8800/updatename", { name: newName, userID: userID }).then(
      (response) => {
        setUserList(
          userList.map((val) => {
            return val.userID === userID
              ? {
                  userID: val.userID,
                  password: val.password,
                  name: newName,
                  studyYear: val.studyYear,
                  major: val.major,
                  age: val.age,
                }
              : val;
          })
        );
      }
    );
  };
  const updateUserPassword = (userID) => {
    Axios.put("http://localhost:8800/updatepassword", { password: newPassword, userID: userID }).then(
      (response) => {
        setUserList(
          userList.map((val) => {
            return val.userID === userID
              ? {
                  userID: val.userID,
                  password: newPassword,
                  name: val.name,
                  studyYear: val.studyYear,
                  major: val.major,
                  age: val.age,
                }
              : val;
          })
        );
      }
    );
  };
  const updateUserStudyYear = (userID) => {
    Axios.put("http://localhost:8800/updateyear", { studyYear: newStudyYear, userID: userID }).then(
      (response) => {
        setUserList(
          userList.map((val) => {
            return val.userID === userID
              ? {
                  userID: val.userID,
                  password: val.password,
                  name: val.name,
                  studyYear: newStudyYear,
                  major: val.major,
                  age: val.age,
                }
              : val;
          })
        );
      }
    );
  };
  const updateUserMajor = (userID) => {
    Axios.put("http://localhost:8800/updatemajor", { major: newMajor, userID: userID }).then(
      (response) => {
        setUserList(
          userList.map((val) => {
            return val.userID === userID
              ? {
                  userID: val.userID,
                  password: val.password,
                  name: val.name,
                  studyYear: val.studyYear,
                  major: newMajor,
                  age: val.age,
                }
              : val;
          })
        );
      }
    );
  };
  const updateUserAge = (userID) => {
    Axios.put("http://localhost:8800/updateage", { age: newAge, userID: userID }).then(
      (response) => {
        setUserList(
          userList.map((val) => {
            return val.userID === userID
              ? {
                  userID: val.userID,
                  password: val.password,
                  name: val.name,
                  studyYear: val.studyYear,
                  major: val.major,
                  age: newAge,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteUser = (userID) => {
    Axios.put("http://localhost:8800/incap", { userID: userID });
    Axios.delete(`http://localhost:8800/deleteuser/${userID}`).then((response) => {
      setUserList(
        userList.filter((val) => {
          return val.userID !== userID;
        })
      );
    });
  };

  // const [showInput, setShowInput] = useState(false);
  // const handleClick = () => {setShowInput(!showInput);};
  const handleClick = (userID) => {
    setUserList(prevUserList => prevUserList.map(user => {
      if (user.userID === userID) {
        return { ...user, showInput: !user.showInput, showList: false };
      } else {
        return { ...user, showList: false, showInput: false };
      }
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getUser();
  };

  // const [showList, setShowList] = useState(false);
  // const handleList = () => {setShowList(!showList);}
  const handleList = (userID) => {
    getUserCourse(userID);
    setUserList(prevUserList => prevUserList.map(user => {
      if (user.userID === userID) {
        return { ...user, showList: !user.showList, showInput: false };
      } else {
        return { ...user, showList: false, showInput: false };
      }
    }));
  };

  return (
    <div>
      <nav>
        <ul className="Nav">
          <li className='Fix'><a href="/courseList" className="Left">View Course Browsing Page</a></li>
          <li className="Center">Admin Profile</li>
          <li className='Fix'><a href="/login" className="Right">Logout</a></li>
        </ul>
      </nav>

      <div className='SearchEngine'>
        <form method="get" className="Form" onSubmit={handleSubmit}>
          <label>Search user: </label>
          <input type="text" placeholder='Input nothing to show all user' style={{width:"180px"}} onChange={(event) => {setKeyword(event.target.value);}}/>
          <button type='Submit'><img src={searchlogo} alt='Search' title='Search'/></button>
        </form>
        <details className='AddUser'>
          <summary><u>Add User?</u></summary>
          <form>
            <label>UserID: </label>
            <input type="number" onChange={(event) => {setUserID(event.target.value);}} style={{width:"100px"}}/>
            <label> Password: </label>
            <input type="text" onChange={(event) => {setPassword(event.target.value);}} style={{width:"80px"}}/>
            <label> Name: </label>
            <input type="text" onChange={(event) => {setName(event.target.value);}} style={{width:"90px"}}/>
            <label> Study Year: </label>
            <input type="number" onChange={(event) => {setStudyYear(event.target.value);}} style={{width:"45px"}}/>
            <label> Major: </label>
            <input type="text" onChange={(event) => {setMajor(event.target.value);}} style={{width:"90px"}}/>
            <label> Age: </label>
            <input type="number" onChange={(event) => {setAge(event.target.value);}} style={{width:"45px"}}/>
            <button onClick={(event) => {event.preventDefault(); addUser();}}><img src={addlogo} alt="Add" title='Add'/></button>
          </form>
        </details>
      </div>

      <hr/>
      <div>
        <table className='UserInfo'>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Password</th>
              <th>Name</th>
              <th>Study Year</th>
              <th>Major</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {userList.map(user=>(
            <tr key={user.userID}>
              <td>{user.userID}</td>
              <td className='Action'>
                {user.password}
                {user.showInput && ( <span>&#160;<input type="text" placeholder={user.password} onChange={(event)=>{setNewPassword(event.target.value);}}/>
                                <button onClick={() => {updateUserPassword(user.userID);}}><img src={updatelogo} alt="Update" title='Update'/></button></span>)}
              </td>
              <td className='Action'>
                {user.name}
                {user.showInput && ( <span>&#160;<input type="text" placeholder={user.name} onChange={(event)=>{setNewName(event.target.value);}}/>
                                <button onClick={() => {updateUserName(user.userID);}}><img src={updatelogo} alt="Update" title='Update'/></button></span>)}
              </td>
              <td className='Action TextBox'>
                {user.studyYear}
                {user.showInput && ( <span>&#160;<input type="number" placeholder={user.studyYear} onChange={(event)=>{setNewStudyYear(event.target.value);}}/>
                                <button onClick={() => {updateUserStudyYear(user.userID);}}><img src={updatelogo} alt="Update" title='Update'/></button></span>)}
              </td>
              <td className='Action'>
                {user.major}
                {user.showInput && ( <span>&#160;<input type="text" placeholder={user.major} onChange={(event)=>{setNewMajor(event.target.value);}}/>
                                <button onClick={() => {updateUserMajor(user.userID);}}><img src={updatelogo} alt="Update" title='Update'/></button></span>)}
              </td>              
              <td className='Action TextBox'>
                {user.age}
                {user.showInput && ( <span>&#160;<input type="number" placeholder={user.age} onChange={(event)=>{setNewAge(event.target.value);}}/>
                                <button onClick={() => {updateUserAge(user.userID);}}><img src={updatelogo} alt="Update" title='Update'/></button></span>)}
              </td>
              <td className='Action'>
                <button onClick={() => {handleClick(user.userID);}}><img src={editlogo} alt="Edit" title='Edit' /></button>&#160;
                <button onClick={() => {deleteUser(user.userID);}}><img src={deletelogo} alt='Delete' title='Delete'/></button>&#160;
                <div className="Popup"><button onClick={(event) => {event.preventDefault(); handleList(user.userID);}}><img src={morelogo} alt='More details' title='More details' /></button>
                {user.showList && (
                  <div className='Popuptext Show'>
                    <ul>
                      {courseList.filter(courseID => courseID.userID === user.userID).map(x => (
                        <li key={x.courseID}>{x.courseID}</li>
                      ))}
                    </ul>
                  </div>
                )}
                </div> 

              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}