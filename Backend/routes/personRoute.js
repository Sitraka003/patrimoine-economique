const express = require("express");
const { getPersons, addPerson, closePossession } = require("../controllers/personController");

const router = express.Router();

router.get("/", getPersons);
router.post("/", addPerson);
router.post("/close", closePossession);

module.exports = router;
