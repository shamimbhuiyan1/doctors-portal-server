const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//mongodb
const uri =
  "mongodb+srv://doctor_admin:<password>@cluster0.nosty.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

async function run() {
  try {
  } finally {
  }
}

run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Server Running to the Doctor");
});
app.listen(port, () => {
  console.log("DOCTORS APP", port);
});
