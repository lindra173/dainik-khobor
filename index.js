

import express from "express";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const app = express();
const port = 3000;

app.use(express.json());

const adapter = new JSONFile("db.json");
const db = new Low(adapter);

await db.read();
db.data ||= { news: [] };
await db.write();

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

node index.js
Server running at http://localhost:3000
curl http://localhost:3000/news
curl -X POST http://localhost:3000/news \
.-H "Content-Type: application/json" \
-d '{"title":"নতুন খবর", "content":"এটি একটি পরীক্ষামূলক খবর।"}'
curl -X DELETE http://localhost:3000/news/1

curl -X POST http://localhost:3000/news \ -H 
"Content-Type: application/json" \ -d '{"title":"নতুন 
খবর", "content":"এটি একটি পরীক্ষামূলক খবর।"}' curl -X POST 
http://localhost:3000/news \ -H "Content-Type: 
application/json" \
-d '{"title":"নতুন খবর", "content":"কেমন আছেন সবাই।"}'^J 

curl http://localhost:3000/news
ip a

