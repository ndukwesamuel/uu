const express = require("express");
require("dotenv").config();
require("express-async-errors");
const app = express();
const connectDB = require("./db/connect");
const port = process.env.PORT || 5000;

const personRoute = require("./routes/personroutes");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());

app.use("/api", personRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start(); /**/
