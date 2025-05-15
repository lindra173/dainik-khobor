import express from "express";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const app = express();
const port = process.env.PORT || 3000;

const adapter = new JSONFile("db.json");
const db = new Low(adapter);

await db.read();
db.data ||= { news: [] };
await db.write();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Dainik Khobor!");
});

app.get("/news", async (req, res) => {
  await db.read();
  res.json(db.data.news);
});

app.post("/news", async (req, res) => {
  const { title, content } = req.body;
  const newArticle = {
    id: Date.now(),
    title,
    content,
    date: new Date().toISOString()
  };
  db.data.news.push(newArticle);
  await db.write();
  res.status(201).json(newArticle);
});

app.delete("/news/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  db.data.news = db.data.news.filter(item => item.id !== id);
  await db.write();
  res.json({ message: "Deleted", id });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
