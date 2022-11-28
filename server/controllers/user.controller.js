const bcrypt = require("bcrypt")
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")

const db = require("../database");

const pool = db();

router.get("/user", async (req, res) => {
  await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Fail to connect",
      });
    }
    connection.query("SELECT * FROM user", (error, response) => {
      if (error) {
        return res.status(500).json({
          message: "error in fetching data",
        });
      } else {
        return res.status(201).json({
          message: "success",
          data: response,
        });
      }
    });
  });
});

router.get("/user/:id", async (req, res) => {
  const ids = req.params.id;
  await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Fail to connect",
      });
    }
    connection.query(
      "SELECT * FROM user WHERE id = ?",
      [ids],
      (error, response) => {
        if (error) {
          return res.status(500).json({
            message: "error in fetching data",
          });
        } else {
          return res.status(201).json({
            message: "success",
            data: response,
          });
        }
      }
    );
  });
});

router.post("/user", async (req, res) => {
  const { username, contact,address, city } = req.body;

  await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to connect",
      });
    }
    connection.query(
      "INSERT INTO user(username,contact,address,city) VALUES(?,?,?,?)",
      [username, contact, address, city],
      (error, response) => {
        if (error) {
          return res.status(500).json({
            message: "error in posting data",
          });
        } else {
          return res.status(201).json({
            message: "success",
            data: response,
          });
        }
      }
    );
  });
});

router.put("/user/:id", async (req, res) => {
  const ids = req.params.id;
  const { username, contact, address, city } = req.body;
  console.log('req.body',req.body,ids)

  await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Fail to connect",
      });
    }
    connection.query(
      "UPDATE user SET username=?, contact=? , address=?, city=? WHERE id = ?",
      [username, contact, address, city, ids],
      (error, response) => {
        if (error) {
          return res.status(500).json({
            message: "error in fetching data",
          });
        } else {
          return res.status(201).json({
            message: "success",
            data: response,
          });
        }
      }
    );
  });
});

router.delete("/user/:id", async (req, res) => {
  const ids = req.params.id;
  await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Fail to connect",
      });
    }
    connection.query(
      "DELETE FROM user WHERE id = ?",
      [ids],
      (error, response) => {
        if (error) {
          return res.status(500).json({
            message: "error in fetching data",
          });
        } else {
          return res.status(201).json({
            message: "success",
            data: response,
          });
        }
      }
    );
  });
});

router.get("/signup", async (req, res) => {
  await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Fail to connect",
      });
    }
    connection.query("SELECT * FROM signup", (error, response) => {
      if (error) {
        return res.status(500).json({
          message: "error in fetching data",
        });
      } else {
        return res.status(201).json({
          message: "success",
          data: response,
        });
      }
    });
  });
});

router.get("/signup/:id", async (req, res) => {
  const ids = req.params.id;
  await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Fail to connect",
      });
    }
    connection.query(
      "SELECT * FROM signup WHERE id = ?",
      [ids],
      (error, response) => {
        if (error) {
          return res.status(500).json({
            message: "error in fetching data",
          });
        } else {
          return res.status(201).json({
            message: "success",
            data: response,
          });
        }
      }
    );
  });
});
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  await pool.getConnection( (err, connection) => {


  if (err) return res.status(500).json(err);
  if (res.length) return res.status(409).json("User already exists!");

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

    connection.query(
      "INSERT INTO signup(name, email, password) VALUES(?,?,?)",
      [name, email, password],
      (error, response) => {
        if (error) {
          return res.status(500).json({
            message: "error in posting data",
          });
        } else {
          return res.status(201).json({
            message: "success",
            data: response,
          });
        }
      }
    );
  });
});

router.put("/signup/:id", async (req, res) => {
  const ids = req.params.id;
  const { name, email, password } = req.body;

  await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Fail to connect",
      });
    }
    connection.query(
      "UPDATE signup SET name=?, email=? , password=?, WHERE id = ?",
      [name, email, password, ids],
      (error, response) => {
        if (error) {
          return res.status(500).json({
            message: "error in fetching data",
          });
        } else {
          return res.status(201).json({
            message: "success",
            data: response,
          });
        }
      }
    );
  });
});

// router.delete("/signup/:id", async (req, res) => {
//   const ids = req.params.id;
//   await pool.getConnection((err, connection) => {
//     if (err) {
//       return res.status(500).json({
//         message: "Fail to connect",
//       });
//     }
//     connection.query(
//       "DELETE FROM signup WHERE id = ?",
//       [ids],
//       (error, response) => {
//         if (error) {
//           return res.status(500).json({
//             message: "error in fetching data",
//           });
//         } else {
//           return res.status(201).json({
//             message: "success",
//             data: response,
//           });
//         }
//       }
//     );
//   });
// });

router.post("/login", async (req, res) => {
  console.log('req',req.body)
  const {email} = req.body;
  await pool.getConnection((err, connection) => {
 if (err) {
      return res.status(500).json({
        message: "Failed to connect",
      });
    }
    connection.query(
      "SELECT * FROM signup WHERE email = ?",
      [email],
      (error, response) => {
        if (error) {
          return res.status(500).json({
            message: "error in posting data",
          });
        } else {
          
          if (response.length === 0){
           return res.status(404).json({
            message:"User not found!"
           });
          }
          else{
            console.log('response',response)
            const token = jwt.sign({ id: response[0].id,email:response[0].email }, "jwtkey");
          return res.status(201).json({
            message: "success",
            data: response,
            token:token
          });
        }
        }
      }
    );
  });
});



  

router.put("/login/:id", async (req, res) => {
  const ids = req.params.id;
  const { email,password} = req.body;

  await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Fail to connect",
      });
    }
    connection.query(
      "UPDATE signup SET  email=? , password=?, WHERE id = ?",
      [ email, password, ids],
      (error, response) => {
        if (error) {
          return res.status(500).json({
            message: "error in fetching data",
          });
        } else {
          return res.status(201).json({
            message: "success",
            data: response,
          });
        }
      }
    );
  });
});

router.get("/viewuser", async (req, res) => {
  await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Fail to connect",
      });
    }
    connection.query("SELECT * FROM user", (error, response) => {
      if (error) {
        return res.status(500).json({
          message: "error in fetching data",
        });
      } else {
        return res.status(201).json({
          message: "success",
          data: response,
        });
      }
    });
  });
});

router.get("/viewuser/:id", async (req, res) => {
  const ids = req.params.id;
  await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Fail to connect",
      });
    }
    connection.query(
      "SELECT * FROM user WHERE id = ?",
      [ids],
      (error, response) => {
        if (error) {
          return res.status(500).json({
            message: "error in fetching data",
          });
        } else {
          return res.status(201).json({
            message: "success",
            data: response,
          });
        }
      }
    );
  });
});




module.exports = router;