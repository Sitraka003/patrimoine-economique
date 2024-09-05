import express from "express";
import cors from "cors";
import myData from "./test.json" assert { type: "json" };

const app = express();
const port = 8000;

app.use(cors()); // Permet les requêtes Cross-Origin

// Correction: Ajout de "/" au début du chemin
app.get("/myData", (req, res) => {
  res.json(myData);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});