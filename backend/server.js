import express from "express";
import fs from "node:fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import Possession from "../models/possessions/Possession.js";
import Patrimoine from "../models/Patrimoine.js";
import Flux from "../models/possessions/Flux.js";

const app = express();
const PORT = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// chemin du JSON
const filePath = path.join(__dirname, "data/data.json");

app.use(cors());
app.use(express.json());

// lecture du JSON
async function readData() {
  try {
    const data = await fs.readFile(filePath, { encoding: "utf8" });
    console.log("Contenu brut du fichier lu :", data);
    const parsedData = JSON.parse(data);

    if (!parsedData.possessions) {
      parsedData.possessions = [];
    }

    return parsedData;
  } catch (error) {
    console.error("Erreur lors de la lecture des données :", error);
    throw error;
  }
}

// écrire les données dans le JSON
async function writeData(data) {
  console.log("Écriture des données dans le fichier...");
  console.log("Données à écrire :", JSON.stringify(data, null, 2));
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), {
    encoding: "utf8",
  });
  console.log("Données écrites avec succès.");
}

// 1. GET /possession: Get Possession list
app.get("/possession", async (req, res) => {
  try {
    const possessions = await readData();
    res.json(possessions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des possessions." });
  }
});

// 2. POST /possession: Create Possession ok
app.post("/possession", async (req, res) => {
  try {
    const newPossession = new Possession(
      req.body.possesseur,
      req.body.libelle,
      req.body.valeur,
      new Date(req.body.dateDebut),
      req.body.dateFin ? new Date(req.body.dateFin) : null,
      req.body.tauxAmortissement
    );

    const data = await readData();

    const patrimoineData = data.find((item) => item.model === "Patrimoine");

    if (!patrimoineData) {
      return res.status(404).json({ error: "Modèle Patrimoine non trouvé." });
    }

    if (!patrimoineData.data.possessions) {
      patrimoineData.data.possessions = [];
    }

    patrimoineData.data.possessions.push(newPossession);

    // Recalculez la valeur totale du patrimoine
    const currentDate = new Date();
    let totalValeur = 0;
    patrimoineData.data.possessions.forEach((possession) => {
      totalValeur += possession.getValeur(currentDate) || 0;
    });
    patrimoineData.data.valeurTotale = totalValeur;

    await writeData(data);

    res.status(201).json(newPossession);
  } catch (error) {
    console.error("Erreur lors de la création de la possession :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la création de la possession." });
  }
});

// 3. PUT /possession/:libelle: Update Possession by libelle
app.put("/possession/:libelle", async (req, res) => {
  try {
    const { libelle } = req.params;
    const data = await readData();

    // acces à la liste des possessions dans patrimoine
    const patrimoineData = data.find((item) => item.model === "Patrimoine");

    if (
      patrimoineData &&
      patrimoineData.data &&
      patrimoineData.data.possessions
    ) {
      const possession = patrimoineData.data.possessions.find(
        (p) => p.libelle === libelle
      );

      if (possession) {
        // mise à jour des valeurs de la possession
        possession.libelle = req.body.libelle || possession.libelle;
        possession.dateFin = req.body.dateFin
          ? new Date(req.body.dateFin)
          : possession.dateFin;

        await writeData(data);
        res.json(possession);
      } else {
        res.status(404).json({ error: "Possession non trouvée." });
      }
    } else {
      res.status(404).json({ error: "Aucune possession trouvée." });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la possession :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de la possession." });
  }
});

// 4. POST /possession/:libelle/close: Close Possession by setting dateFin to current Date
app.post("/possession/:libelle/close", async (req, res) => {
  try {
    const { libelle } = req.params;
    const data = await readData();

    const patrimoineData = data.find((item) => item.model === "Patrimoine");

    if (
      patrimoineData &&
      patrimoineData.data &&
      patrimoineData.data.possessions
    ) {
      const possession = patrimoineData.data.possessions.find(
        (p) => p.libelle === libelle
      );

      if (possession) {
        possession.dateFin = new Date();
        await writeData(data);
        res.json(possession);
      } else {
        res.status(404).json({ error: "Possession non trouvée." });
      }
    } else {
      res.status(404).json({ error: "Aucune possession trouvée." });
    }
  } catch (error) {
    console.error("Erreur lors de la fermeture de la possession :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la fermeture de la possession." });
  }
});

// 5. GET /patrimoine/:date: Get Valeur Patrimoine
app.get("/patrimoine/:date", async (req, res) => {
  try {
    const { date } = req.params;
    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) {
      return res.status(400).json({ error: "Date invalide." });
    }

    console.log("Date reçue:", dateObj);

    const data = await readData();
    const patrimoineData = data.find((item) => item.model === "Patrimoine");

    if (!patrimoineData) {
      return res.status(404).json({ error: "Patrimoine non trouvé." });
    }

    const patrimoine = new Patrimoine(
      patrimoineData.data.possesseur,
      patrimoineData.data.possessions
    );
    console.log("Patrimoine chargé:", patrimoine);

    let totalValeur = 0;

    for (const possessionData of patrimoineData.data.possessions) {
      let valeurActuelle = 0;

      try {
        console.log(
          `Traitement de la possession: ${possessionData.libelle}`,
          possessionData
        );

        // Vérifiez si c'est un Flux
        if (
          possessionData.valeurConstante !== undefined &&
          possessionData.jour !== undefined
        ) {
          // Traitement des flux
          const flux = new Flux(
            possessionData.possesseur,
            possessionData.libelle,
            possessionData.valeurConstante,
            new Date(possessionData.dateDebut),
            possessionData.dateFin ? new Date(possessionData.dateFin) : null,
            possessionData.tauxAmortissement,
            possessionData.jour
          );
          valeurActuelle = flux.getValeur(dateObj);
          console.log(
            `Flux - Libelle: ${possessionData.libelle}, Valeur: ${valeurActuelle}`
          );
        } else {
          // Traitement des possessions normales
          const possession = new Possession(
            possessionData.possesseur,
            possessionData.libelle,
            possessionData.valeur,
            new Date(possessionData.dateDebut),
            possessionData.dateFin ? new Date(possessionData.dateFin) : null,
            possessionData.tauxAmortissement
          );
          valeurActuelle = possession.getValeur(dateObj);
          console.log(
            `Possession - Libelle: ${possessionData.libelle}, Valeur: ${valeurActuelle}`
          );
        }

        totalValeur += valeurActuelle;
      } catch (error) {
        console.error(
          `Erreur lors du traitement de la possession ${possessionData.libelle}:`,
          error
        );
        return res.status(500).json({
          error: `Erreur lors du traitement de la possession ${possessionData.libelle}: ${error.message}`,
        });
      }
    }

    console.log("Valeur totale calculée:", totalValeur);
    res.json({ valeur: totalValeur });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de la valeur du patrimoine:",
      error
    );
    res.status(500).json({
      error: `Erreur lors de la récupération de la valeur du patrimoine: ${error.message}`,
    });
  }
});

// 6. POST /patrimoine/range: Get Valeur Patrimoine Range
app.post("/patrimoine/range", async (req, res) => {
  try {
    const { type, dateDebut, dateFin } = req.body;
    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);

    if (isNaN(debut.getTime()) || isNaN(fin.getTime())) {
      return res.status(400).json({ error: "Dates invalides." });
    }

    const data = await readData();
    const patrimoineData = data.find((item) => item.model === "Patrimoine");

    if (!patrimoineData) {
      return res.status(404).json({ error: "Patrimoine non trouvé." });
    }

    const patrimoine = new Patrimoine(
      patrimoineData.data.possesseur,
      patrimoineData.data.possessions
    );

    let result = [];
    let currentDate = new Date(debut);

    while (currentDate <= fin) {
      let totalValeur = 0;

      for (const possessionData of patrimoineData.data.possessions) {
        let valeurActuelle = 0;

        try {
          if (
            possessionData.valeurConstante !== undefined &&
            possessionData.jour !== undefined
          ) {
            // flux
            const flux = new Flux(
              possessionData.possesseur,
              possessionData.libelle,
              possessionData.valeurConstante,
              new Date(possessionData.dateDebut),
              possessionData.dateFin ? new Date(possessionData.dateFin) : null,
              possessionData.tauxAmortissement,
              possessionData.jour
            );
            valeurActuelle = flux.getValeur(currentDate);
          } else {
            // possessions normales
            const possession = new Possession(
              possessionData.possesseur,
              possessionData.libelle,
              possessionData.valeur,
              new Date(possessionData.dateDebut),
              possessionData.dateFin ? new Date(possessionData.dateFin) : null,
              possessionData.tauxAmortissement
            );
            valeurActuelle = possession.getValeur(currentDate);
          }

          totalValeur += valeurActuelle;
        } catch (error) {
          console.error(
            `Erreur lors du traitement de la possession ${possessionData.libelle}:`,
            error
          );
          return res.status(500).json({
            error: `Erreur lors du traitement de la possession ${possessionData.libelle}: ${error.message}`,
          });
        }
      }

      result.push({
        date: currentDate.toISOString().split("T")[0],
        valeur: totalValeur,
      });

      if (type === "mois") {
        currentDate.setMonth(currentDate.getMonth() + 1);
        currentDate.setDate(1);
      } else if (type === "année") {
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        currentDate.setMonth(0);
        currentDate.setDate(1);
      } else {
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    if (type === "mois") {
      result = result.filter(
        (entry, index, self) =>
          index ===
          self.findIndex((e) => e.date.slice(0, 7) === entry.date.slice(0, 7))
      );
    } else if (type === "année") {
      result = result.filter(
        (entry, index, self) =>
          index ===
          self.findIndex((e) => e.date.slice(0, 4) === entry.date.slice(0, 4))
      );
    }

    res.json({ valeur: result });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de la valeur du patrimoine :",
      error
    );
    res.status(500).json({
      error: "Erreur lors de la récupération de la valeur du patrimoine.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
