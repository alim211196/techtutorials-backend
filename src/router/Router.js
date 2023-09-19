const express = require("express");
const router = express.Router();
const db = require("../db/conn");

// Registration API
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (selectError, selectResults) => {
      if (selectError) {
        console.error(selectError);
        res.status(500).json({ error: "Error checking email existence" });
      } else {
        if (selectResults.length > 0) {
          res.status(400).json({ error: "Email already exists" });
        } else {
          db.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, password],
            (insertError) => {
              if (insertError) {
                console.error(insertError);
                res.status(500).json({ error: "Error creating user" });
              } else {
                res
                  .status(201)
                  .json({
                    message: "Registration successful",
                    user: { name, email },
                  });
              }
            }
          );
        }
      }
    }
  );
});

// Login API
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Error querying the database" });
    } else {
      if (results.length === 0) {
        res.status(401).json({ error: "User not found" });
      } else {
        const user = results[0];
        if (user.password === password) {
          res
            .status(200)
            .json({
              message: "Login successful",
              user: { name: user.name, email: user.email },
            });
        } else {
          res.status(401).json({ error: "Incorrect password" });
        }
      }
    }
  });
});

module.exports = router;
