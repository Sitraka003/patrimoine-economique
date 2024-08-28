const { readData, writeData } = require("../data");

const getPersons = (req, res) => {
    const data = readData();
    res.json(data);
};

const addPerson = (req, res) => {
    const newPerson = req.body;
    const data = readData();

    data.push(newPerson);
    writeData(data);

    res.status(201).json(newPerson);
};

module.exports = { getPersons, addPerson };
