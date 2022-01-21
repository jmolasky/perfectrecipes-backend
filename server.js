///////////////////////////////
// DEPENDENCIES
////////////////////////////////
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const admin = require("firebase-admin");

// const serviceAccount = require("./service-account-credientials.json");
// const { serviceAccount = require("./service-account-credientials.json") } =
//   process.env;

const serviceAccount = JSON.parse(process.env.serviceAccount);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const { PORT = 3001, DATABASE_URL } = process.env;

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
mongoose.connect(DATABASE_URL);
const db = mongoose.connection;
db.on("connected", () => console.log("mongo connected"));
db.on("disconnected", () => console.log("mongo disconnected"));
db.on("error", (error) => console.log(error));

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Mount routes
app.use("/", require("./controllers/recipes"));

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
