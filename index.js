

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  process.env.STRIPE_KEY
);
require("dotenv").config()

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment Request Recieved for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });
  console.log(paymentIntent);
  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
app.listen(8080, (err)=>{
    if(err) throw err
    console.log("server running safly on port 8080")
})

// http://127.0.0.1:5001/gob-40841/us-central1/api)