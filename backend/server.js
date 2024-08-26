import express from "express";
import fs from "node:fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const app = express();
const PORT = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "data", "data.json");

app.use(cors());

app.get("/api/data", async (req, res) => {
  try {
    const data = await fs.readFile(filePath, { encoding: "utf8" });
    res.json(JSON.parse(data));
  } catch (error) {
    console.error("Erreur lors de la lecture du fichier:", error);
    res.status(500).json({ error: "Erreur lors de la lecture du fichier." });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
