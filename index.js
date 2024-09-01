import express from "express";
import passport from "passport";
import session from "express-session";
import mongoose from "mongoose";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "./User.js";
import path from "path";
const __dirname = path.resolve();

const app = express();

mongoose
  .connect("mongodb://localhost:27017/passport-local-demo")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log(err));

app.use(express.json()); // JSON ボディパーサーを追加
app.use(express.urlencoded({ extended: true })); // URLエンコードされたボディパーサーを追加

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true, // XSS攻撃を防ぐ
      sameSite: "strict", // CSRF攻撃を防ぐ
      maxAge: 24 * 60 * 60 * 1000, // セッションの有効期限を設定（例: 24時間）
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

function isLoggedIn(req, res, next) { //* ログイン状態を確認するmiddleware req.isAuthenticated()で確認できる
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "User not authenticated" });
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/newuser", async (req, res) => {
  res.sendFile(path.join(__dirname, "newuser.html"));
  // const user = new User({
  //   username: "poteto",
  //   email: "test@gmail.com",
  // });
  // const password = "this is a password";
  // const newUser = await User.register(user, password);
  // console.log(newUser);
  // req.session.user = newUser;
  // res.json(newUser);
});

app.post("/newuser", async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
  });
  const newUser = await User.register(user, req.body.password);
  console.log(newUser);
  req.session.user = newUser;
  res.json(newUser);
})

app.post("/login", passport.authenticate("local"), (req, res) => {
  // 認証に成功した場合、ユーザー情報をセッションに保存
  req.session.user = req.user;
  res.json(req.user);
});

app.get("/profile", isLoggedIn, async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "User not logged in" });
  }
  console.log(req.session.user);
  const user = await User.findById(req.session.user._id);
  console.log(user);
  res.json(user);
});

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});