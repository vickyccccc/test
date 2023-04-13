import React from 'react'
import "./User.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function User() {
    const [userList, setUserList] = useState([]);
    const [courseList, setCourseList] = useState([]);
  
    const [message, setMessage] = React.useState("");
    const [open, setOpen] = React.useState(false);
  
    useEffect(() => {
      fetch("http://localhost:8800/userinfo")
        .then((res) => res.json())
        .then((result) => setUserList(result));
    }, []);
  
    useEffect(() => {
      fetch("http://localhost:8800/getcourse")
        .then((res) => res.json())
        .then((result) => setCourseList(result));
    }, []);
  
    const dropCourse = (cid, capacity) => {
      Axios.put("http://localhost:8800/updatecap/", {
        capacity: capacity + 1,
        courseID: cid,
      });
      Axios.delete(`http://localhost:8800/dropcourse/${cid}`).then((response) => {
        setCourseList(
          courseList.filter((val) => {
            return val.courseID !== cid;
          })
        );
      });
      setOpen(true);
      setMessage("This course is dropped successfully");
    };
  
    return (
      <div className="back">
        <meta charset="UTF-8" />
        <div className="box">
          <button className="button CBroPage">
            <a herf="SCourse.html">
              <us className="Browse"></us>Course Browsing Page
            </a>
          </button>
          <div className="CUHK"> </div>
        </div>
        <div className="bar"></div>
  
        <table className="whole">
          <tr>
            {userList.map((val, key) => {
              return (
                <th>
                  <div className="Pro">
                    Student Profile
                    <p className="pim"></p>
                    <div className="info">
                      <table className="infotab">
                        <tr>
                          <th>Name:</th>
                          <td>{val.name}</td>
                        </tr>
                        <tr>
                          <th>StudentID:</th>
                          <td>{val.userID}</td>
                        </tr>
                        <tr>
                          <th>Age:</th>
                          <td>{val.age}</td>
                        </tr>
                        <tr>
                          <th>Major:</th>
                          <td>{val.major}</td>
                        </tr>
                        <tr>
                          <th>Year:</th>
                          <td>{val.studyYear}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </th>
              );
            })}
  
            <td>
              <div className="Sele">
                <table className="Coutab">
                  <tr>
                    <th className="Coutabh">Selected Course</th>
                  </tr>
                  {courseList.map((val, key) => {
                    return (
                      <tr key={val.courseID}>
                        <th>
                          <div className="Course">
                            <details>
                              <summary>
                                {val.courseID} {val.name}
                                <button
                                  type="delete"
                                  className="button Dcourse"
                                  onClick={() =>
                                    dropCourse(val.courseID, val.capacity)
                                  }
                                >
                                  Drop
                                </button>
                                <Popup open={open} modal nested>
                                  {(close) => (
                                    <div className="modal">
                                      {" "}
                                      <button className="close" onClick={close}>
                                        {" "}
                                        &times;{" "}
                                      </button>{" "}
                                      <div className="header">
                                        {" "}
                                        Confirmation{" "}
                                      </div>{" "}
                                      <div className="content">
                                        The course was dropped successfully!</div>{" "}
                                      <div className="actions">
                                        {" "}
                                        <button
                                          className="button confm"
                                          onClick={() => {
                                            console.log("modal closed");
                                            close();
                                          }}
                                        >
                                          {" "}
                                          Confirm{" "}
                                        </button>{" "}
                                      </div>{" "}
                                    </div>
                                  )}
                                </Popup>
                              </summary>
                              <br />
                              <table className="Coursetab">
                                <tr>
                                  <th>Time</th>
                                  <th>Place</th>
                                  <th>Department</th>
                                  <th>Instructor</th>
                                  <th>Capacity</th>
                                </tr>
                                <tr>
                                  <td>{val.time}</td>
                                  <td>{val.place}</td>
                                  <td>{val.department}</td>
                                  <td>{val.instructor}</td>
                                  <td>{val.capacity}</td>
                                </tr>
                              </table>
                            </details>
                          </div>
                        </th>
                      </tr>
                    );
                  })}
                </table>
              </div>
            </td>
          </tr>
        </table>
  
        <button className="button Logout">
          <a herf="login.html">
            <us className="lout"></us>Logout
          </a>
        </button>
      </div>
    );
}
