const express = require("express");
const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");

const app = express();
const port = process.env.PORT || 3000;

const adapter = new JSONFile("db.json");
const db = new Low(adapter);

app.use(express.json());

app.get("/", async (req, res) => {
  await db.read();
  db.data ||= { news: [] }; // ফাঁকা থাকলে ডিফল্ট ডেটা সেট করবে
  await db.write();
  res.send("Welcome to Dainik Khobor!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
