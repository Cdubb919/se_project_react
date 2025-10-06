import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let items = [];

app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/items", (req, res) => {
  const { name, imageUrl, weather } = req.body;
  const newItem = { id: Date.now(), name, imageUrl, weather };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.delete("/items/:id", (req, res) => {
  const { id } = req.params;
  items = items.filter(item => item.id !== Number(id));
  res.status(200).json({ message: "Item deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
