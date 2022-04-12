const express = require("express");
const bodyParser = require("body-parser"); // latest version of exressJS now comes with Body-Parser!
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const multer = require("multer");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const path = require("path");

const db = knex({
  // connect to your own database here:
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "12345678",
    database: "postgres",
  },
});

const app = express();
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const __dirame = path.resolve();
app.use("/uploads", express.static(path.join(__dirame, "/uploads")));
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

app.use(cors());
app.use(express.json()); // latest version of exressJS now comes with Body-Parser!

app.get("/", (req, res) => {
  res.send(db.users);
});
app.post("/signin", signin.handleSignin(db, bcrypt));
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});
app.put("/profile", (req, res) => {
  profile.handleProfilEdit(req, res, db);
});
app.get("/users", (req, res) => {
  profile.getUsers(req, res, db);
});
app.post("/upload", upload.single("image"), (req, res) => {
  res.json(`/${req.file.path}`);
});
app.delete("/deleteuser/:id", (req, res) => {
  profile.handleProfilDelete(req, res, db);
});

app.listen(5000, () => {
  console.log("App is running on port 5000");
});
