const express = require("express");
const router = express.Router();
const {
    getPersons,
    deletePossession,
    deletePerson,
    updatePossession,
    updatePerson,
    addPerson,
    addPossession,
    closePossession
} = require("../controllers/PersonController");

router.get("/personnes", getPersons);
router.delete("/possessions/:nomPossesseur/:libelle", deletePossession);
router.delete("/personnes/:nom", deletePerson);
router.put("/personnes/:nom", updatePerson);
router.put("/possessions/:possesseurNom/:libelle", updatePossession);
router.post("/personnes", addPerson);
router.post("/possessions", addPossession);
router.put('/possessions/:nom/:libelle/close', closePossession);

module.exports = router;
