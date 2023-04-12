const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// const db = mysql.createConnection({
//   user: "root",
//   host: "localhost",
//   password: "mysql123",
//   database: "csci3100",
// });

// const db = mysql.createConnection({
//   user: "admin",
//   host: "database.cc1viev6kz68.us-east-1.rds.amazonaws.com",
//   password: "mysql123",
//   database: "csci3100",
// });

const db = mysql.createConnection({
  user: "root",
  host: "thecs.cnpgvo2q9wqm.us-east-1.rds.amazonaws.com",
  port: '3306',
  password: "csci3100",
  database: "thecs",
});

app.post("/createuser", (req, res) => {
  const userID = req.body.userID;
  const password = req.body.password;
  const name = req.body.name;
  const studyYear = req.body.studyYear;
  const major = req.body.major;
  const age = req.body.age;

  db.query(
    "INSERT INTO user (userID, password, name, studyYear, major, age) VALUES (?,?,?,?,?,?)",
    [userID, password, name, studyYear, major, age],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/user", (req, res) => {
  db.query("SELECT * FROM user ORDER BY userID ASC", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/userbyid", (req, res) => {
  const keyword = req.query.keyword;
  db.query("SELECT * FROM user WHERE userID LIKE ? ORDER BY userID ASC",
  [`%${keyword}%`],
    (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/usercourse", (req, res) => {
  const userID = req.query.userID;
  db.query("SELECT * FROM reg WHERE userID = ? ORDER BY courseID ASC",
    [userID], 
    (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/updatepassword", (req, res) => {
  const userID = req.body.userID;
  const password = req.body.password;
  db.query(
    "UPDATE user SET password = ? WHERE userID = ?",
    [password, userID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.put("/updatename", (req, res) => {
  const userID = req.body.userID;
  const name = req.body.name;
  db.query(
    "UPDATE user SET name = ? WHERE userID = ?",
    [name, userID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.put("/updateyear", (req, res) => {
    const userID = req.body.userID;
    const studyYear = req.body.studyYear;
    db.query(
      "UPDATE user SET studyYear = ? WHERE userID = ?",
      [studyYear, userID],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  app.put("/updatemajor", (req, res) => {
    const userID = req.body.userID;
    const major = req.body.major;
    db.query(
      "UPDATE user SET major = ? WHERE userID = ?",
      [major, userID],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  app.put("/updateage", (req, res) => {
    const userID = req.body.userID;
    const age = req.body.age;
    db.query(
      "UPDATE user SET age = ? WHERE userID = ?",
      [age, userID],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  // app.put("/updateuser", (req, res) => {
  //   const userID = req.body.userID;
  //   const name = req.body.name;
  //   const studyYear = req.body.studyYear;
  //   const major = req.body.major;
  //   const age = req.body.age;
  //   db.query(
  //     "UPDATE user SET name = ? , studyYear = ? , major = ? , age = ? WHERE userID = ?",
  //     [name, studyYear, major, age, userID],
  //     (err, result) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         res.send(result);
  //       }
  //     }
  //   );
  // });

app.delete("/deleteuser/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM user WHERE userID = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/incap", (req, res) => {
  const userID = req.body.userID;
  db.query("UPDATE course SET course.capacity = course.capacity + 1 WHERE EXISTS ( SELECT DISTINCT reg.courseID FROM user, reg WHERE reg.userID = user.userID AND course.courseID = reg.courseID AND user.userID = ?)", userID, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// app.listen(3001, () => {
//   console.log("Yey, your server is running on port 3001");
// });

app.listen(8800, () => {
  console.log("Yey, your server is running on port 8800");
});