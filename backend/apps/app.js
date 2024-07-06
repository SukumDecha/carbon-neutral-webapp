const express = require("express");
const cors = require("cors");
const foodRouter = require("./blog/blog.controller");

const app = express();

// Mounts the specified middleware function or functions at the specified path:
// the middleware function is executed when the base of the requested path matches path.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
