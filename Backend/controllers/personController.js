const { readData, writeData } = require("../data");

const getPersons = (req, res) => {
    const data = readData();
    res.json(data);
};

const deletePerson = (req, res) => {
    const { nom } = req.params;
    let data = readData();

    const updatedData = data.filter(
        (item) =>
            (item.model !== "Personne" || item.data.nom.trim() !== nom.trim()) &&
            (item.model !== "Patrimoine" || item.data.possesseur.nom.trim() !== nom.trim())
    );

    if (data.length === updatedData.length) {
        return res.status(404).json({ message: "Personne non trouvée" });
    }

    writeData(updatedData);
    res.status(200).json({ message: "Personne et possessions supprimées avec succès" });
};


const deletePossession = (req, res) => {
    const { nomPossesseur, libelle } = req.params;
    let data = readData();

    let updated = false;

    const updatedData = data.map((item) => {
        if (item.model === "Patrimoine" && item.data.possesseur.nom.trim() === nomPossesseur.trim()) {
            const filteredPossessions = item.data.possessions.filter(
                (possession) => possession.libelle.trim() !== libelle.trim()
            );

            if (filteredPossessions.length !== item.data.possessions.length) {
                updated = true;
                return {
                    ...item,
                    data: {
                        ...item.data,
                        possessions: filteredPossessions,
                    },
                };
            }
        }
        return item;
    });

    if (updated) {
        writeData(updatedData);
        res.status(200).json({ message: "Possession supprimée avec succès." });
    } else {
        res.status(404).json({ message: "Possession non trouvée." });
    }
};

const updatePerson = (req, res) => {
    const { nom } = req.params;
    const { nom: nouveauNom } = req.body;

    let data = readData();

    let personUpdated = false;
    const updatedData = data.map((item) => {
        if (item.model === "Personne" && item.data.nom === nom) {
            personUpdated = true;
            return {
                ...item,
                data: { nom: nouveauNom },
            };
        }
        return item;
    });

    if (personUpdated) {
        writeData(updatedData);
        res.status(200).json({ message: 'Personne mise à jour avec succès' });
    } else {
        res.status(404).json({ message: 'Personne non trouvée' });
    }
};

const updatePossession = (req, res) => {
    const { possesseurNom, libelle } = req.params;
    const { libelle: nouveauLibelle, dateFin, valeur, valeurConstante, tauxAmortissement } = req.body;

    // Validation de l'entrée
    if (!nouveauLibelle || typeof nouveauLibelle !== 'string') {
        return res.status(400).json({ message: "Libellé invalide fourni." });
    }

    let data = readData();
    let possessionTrouvee = false;

    // Mise à jour des données
    const updatedData = data.map((item) => {
        if (item.model === "Patrimoine" && item.data.possesseur.nom.trim() === possesseurNom.trim()) {
            const updatedPossessions = item.data.possessions.map((possession) => {
                if (possession.libelle.trim() === libelle.trim()) {
                    possessionTrouvee = true;
                    return {
                        ...possession,
                        libelle: nouveauLibelle.trim(),
                        dateFin: dateFin ? new Date(dateFin).toISOString() : possession.dateFin, // Garde l'ancienne date si non fournie
                        valeur: typeof valeur === 'number' ? valeur : possession.valeur, // Mise à jour si valeur fournie
                        valeurConstante: typeof valeurConstante === 'boolean' ? valeurConstante : possession.valeurConstante, // Mise à jour si booléen fourni
                        tauxAmortissement: typeof tauxAmortissement === 'number' ? tauxAmortissement : possession.tauxAmortissement, // Mise à jour si fourni
                    };
                }
                return possession;
            });
            return {
                ...item,
                data: {
                    ...item.data,
                    possessions: updatedPossessions,
                },
            };
        }
        return item;
    });

    if (!possessionTrouvee) {
        return res.status(404).json({ message: 'Possession non trouvée' });
    }

    writeData(updatedData);
    res.status(200).json({ message: 'Possession mise à jour avec succès', data: updatedData });
};



const addPerson = (req, res) => {
    const newPerson = req.body;
    const data = readData();

    const personData = {
        model: "Personne",
        data: {
            nom: newPerson.nom
        }
    };

    data.push(personData);

    // Ajoute également les possessions de cette personne
    const patrimoineData = {
        model: "Patrimoine",
        data: {
            possesseur: {
                nom: newPerson.nom
            },
            possessions: newPerson.possessions
        }
    };

    data.push(patrimoineData);

    writeData(data);

    res.status(201).json(newPerson);
};


const addPossession = (req, res) => {
    const { nom, libelle, valeur, dateDebut, dateFin, tauxAmortissement, valeurConstante, jour } = req.body;
    const data = readData();

    const patrimoine = data.find(item => item.model === "Patrimoine" && item.data.possesseur.nom === nom);

    if (patrimoine) {
        const newPossession = {
            possesseur: { nom },
            libelle,
            valeur,
            dateDebut,
            dateFin: dateFin || null,
            tauxAmortissement: tauxAmortissement || null,
            valeurConstante: valeurConstante || null,
            jour: jour || null
        };

        patrimoine.data.possessions.push(newPossession);
        writeData(data);

        res.status(201).json(newPossession);
    } else {
        res.status(404).json({ message: "Personne non trouvée" });
    }
};



const closePossession = (req, res) => {
    const { nom, libelle } = req.params;
    const dateFin = new Date().toISOString().split("T")[0];

    try {
        let data = readData();
        let updated = false;

        data = data.map(item => {
            if (item.model === 'Patrimoine' && item.data.possesseur.nom.trim() === nom.trim()) {
                item.data.possessions = item.data.possessions.map(possession => {
                    if (possession.libelle.trim() === libelle.trim() && !possession.dateFin) {
                        updated = true;
                        return {
                            ...possession,
                            dateFin: dateFin
                        };
                    }
                    return possession;
                });
            }
            return item;
        });

        if (updated) {
            writeData(data);
            res.status(200).json({ message: 'Possession clôturée avec succès' });
        } else {
            res.status(404).json({ message: 'Possession non trouvée ou déjà clôturée' });
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour:', error.message);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

module.exports = {
    getPersons,
    deletePossession,
    deletePerson,
    updatePerson,
    updatePossession,
    addPerson,
    addPossession,
    closePossession
};
