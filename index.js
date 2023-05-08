const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/User.routes");
const { noteRouter } = require("./routes/Note.routes");
const { auth } = require("./middleware/auth.middleware");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);

//Protected
app.use(auth);
app.use("/notes", noteRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to the DB");
  } catch (error) {
    console.log(error);
    console.log("Cannot connect to the DB");
  }
  console.log(`Server is running at port ${process.env.port}`);
});
