import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import mysql from "mysql";

const secret = "sommar";

function generateAccessToken(userId) {
  return jwt.sign(userId, secret);
}
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("token", token);

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secret, (err, userId) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.userId = userId;

    next();
  });
}

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = 4002;
const users = [];
const accounts = [];

let userIds = 1;

app.post("/users", (req, res) => {
  const user = req.body;
  console.log("req body:" + user.userName + " " + user.passWord);

  user.id = userIds++;

  users.push(user);

  const account = {
    money: "1000",
    userId: user.id,
  };

  accounts.push(account);
  console.log(users);

  res.statusCode = 200;
  res.send("you try!!");
});

//1. skapa token från user. skicka token till användare
//2. Användare skickar med sin token i nästa request -> omvandlar token till user ingen

app.post("/sessions", (req, res) => {
  const user = req.body;

  const dbUser = users.find((u) => u.username == user.username);

  if (dbUser != null && dbUser.password == user.password) {
    const token = generateAccessToken(dbUser.id);
    console.log("token", token);

    res.json({ token });
  } else {
    res.status = 401;
    res.json();
  }
});

app.get("/me/accounts", authenticateToken, (req, res) => {
  console.log("userId ", req.userId);

  //används userId för att hämta account.
  const dbAccount = accounts.find((a) => a.userId == req.userId);

  res.json(dbAccount);

  res.json({ userId: req.userId });
});

app.listen(PORT, () => {
  console.log("Server started on port" + PORT);
});
