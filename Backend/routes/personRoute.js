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
    closePossession,
    addNewPossession,

} = require("../controllers/personController");
const { getPatrimoineInRange, getPatrimoineAtDate } = require("../controllers/patrimoineController");
const dataJson = require("../controllers/dataContrloller");

router.get("/personnes", getPersons);
router.delete("/possessions/:nomPossesseur/:libelle", deletePossession);
router.delete("/personnes/:nom", deletePerson);
router.put("/personnes/:nom", updatePerson);
router.put("/possessions/:possesseurNom/:libelle", updatePossession);
router.post("/personnes", addPerson);
router.post("/possessions", addPossession);
router.put('/possessions/:nom/:libelle/close', closePossession);
router.get('/patrimoine/:date', getPatrimoineAtDate);
router.get("/patrimoine/range", getPatrimoineInRange);
router.post('/possessions/:nom', addNewPossession);
router.get("/data", dataJson);

module.exports = router;
