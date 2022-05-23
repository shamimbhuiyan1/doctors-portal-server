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
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nosty.mongodb.net/?retryWrites=true&w=majority`;
/* console.log(uri); */
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    //for all servics
    await client.connect();
    const servicesCollection = client
      .db("doctors_portal")
      .collection("services");

    //for booking
    const bookingCollection = client
      .db("doctors_portal")
      .collection("bookings");

    //for getting all data
    app.get("/service", async (req, res) => {
      const query = {};
      const cursor = servicesCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);

      /**
       * API Naming Convention
       * app.get('/booking') // get all bookings in this collection. or get more than one or by filter
       * app.get('/booking/:id') // get a specific booking
       * app.post('/booking') // add a new booking
       * app.patch('/booking/:id) //
       * app.delete('/booking/:id) //
       *
       */

      app.post("/booking", async (req, res) => {
        const booking = req.body;
        //ekoi din patient ekadik appoinment jate na korte pare se jonno nicher vabe korbo.
        const query = {
          treatment: booking.treatment,
          date: booking.date,
          patient: booking.patient,
        };
        const exists = await bookingCollection.findOne(query);
        if (exists) {
          return res.send({ success: false, booking: exists });
        }
        const result = await bookingCollection.insertOne(booking);
        return res.send({ success: true, result });
      });
    });
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
