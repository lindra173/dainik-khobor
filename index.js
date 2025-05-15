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

  // যদি ডেটা ফাঁকা থাকে, তাহলে ডিফল্ট ডেটা দাও
  db.data ||= { news: [] };
  await db.write();

  res.send("Welcome to Dainik Khobor!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
})

