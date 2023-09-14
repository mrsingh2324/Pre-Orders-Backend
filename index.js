const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // Import Mongoose
const authController = require("./controllers/authController");
const api = require("./controllers/fetchData");
const paymentController = require("./controllers/paymentController");
const app = express();

app.use(express.json());
app.use(cors());

// Remove the MongoDB client connection code and connect using Mongoose
const MONGODB_URI =
  "mongodb+srv://satyam1232:satyam@cluster0.utflrfz.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbConnection = mongoose.connection;

dbConnection.on("connected", () => {
  console.log("Connected to MongoDB successfully!");
});

dbConnection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err.message);
});

// Remove the User model definition here since it is already defined in models/user.js

app.get("/", (req, res) => res.send("Hello World!"));
app.post("/signup", authController.signUp);
app.post("/login", authController.login);
app.use("/payments", paymentController);


app.get("/fetch", async (req, res) => {
  try {
    const queryParams = {
      limit: 30,
      language: "en_US",
      location_id: 297704,
      currency: "USD",
    };
    const apiData = await api.fetchApiData(queryParams);
    res.json(apiData);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
    
});

const port = 5000;
app.listen(port, () => {
  console.log("Server started on port", port);
});
