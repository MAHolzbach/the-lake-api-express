// const serverless = require("serverless-http");
// const express = require("express");
// const { MongoClient, ServerApiVersion } = require("mongodb");
import serverless from "serverless-http";
import express from "express";

import db from "./db/connection.mjs";

const app = express();

// const uri = process.env.MONGO_URI;

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// run().catch(console.dir);

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/path", (req, res) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

app.get("/all-boats", async (req, res) => {
  let collection = await db.collection("boats");
  let results = await collection.find({}).limit(50).toArray();

  res.send(results).status(200);
});

module.exports.handler = serverless(app);
