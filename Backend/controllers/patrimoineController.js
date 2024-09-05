const { readData } = require("../data");

const getPatrimoineAtDate = (req, res) => {
    const { date } = req.params;
    const patrimoineDate = new Date(date);
    const data = readData();

    let patrimoineTotal = 0;

    data.forEach((item) => {
        if (item.model === "Patrimoine") {
            item.data.possessions.forEach((possession) => {
                const dateDebut = new Date(possession.dateDebut);
                const dateFin = possession.dateFin ? new Date(possession.dateFin) : null;

                if (patrimoineDate >= dateDebut && (!dateFin || patrimoineDate <= dateFin)) {
                    let valeurActuelle = possession.valeur;

                    if (possession.tauxAmortissement) {
                        const annees = (patrimoineDate - dateDebut) / (1000 * 60 * 60 * 24 * 365);
                        valeurActuelle = valeurActuelle * (1 - possession.tauxAmortissement / 100 * annees);
                    }

                    patrimoineTotal += valeurActuelle;
                }
            });
        }
    });

    res.status(200).json({ valeurPatrimoine: patrimoineTotal });
};


const getPatrimoineInRange = (req, res) => {
    const { dateDebut, dateFin, jour, type } = req.query;

    if (!dateDebut || !dateFin || !jour || !type) {
        return res.status(400).json({ message: "Paramètres manquants" });
    }

    const data = readData();

    const dateDebutParsed = new Date(dateDebut);
    const dateFinParsed = new Date(dateFin);
    const possessions = [];

    data.forEach(item => {
        if (item.model === "Patrimoine" && item.data.possesseur) {
            item.data.possessions.forEach(possession => {
                const possessionDateDebut = new Date(possession.dateDebut);
                const possessionDateFin = possession.dateFin ? new Date(possession.dateFin) : new Date();

                if (
                    possessionDateDebut <= dateFinParsed &&
                    possessionDateFin >= dateDebutParsed &&
                    possession.jour == jour &&
                    possession.libelle === type
                ) {
                    possessions.push(possession);
                }
            });
        }
    });


    const valeurPatrimoine = possessions.reduce((acc, possession) => {
        let valeurActuelle = possession.valeur || 0;

        if (possession.valeurConstante) {
            const moisDiff =
                (dateFinParsed.getFullYear() - dateDebutParsed.getFullYear()) * 12 +
                (dateFinParsed.getMonth() - dateDebutParsed.getMonth());
            if (moisDiff >= 1) {
                valeurActuelle += moisDiff * possession.valeurConstante;
            }
        }

        return acc + valeurActuelle;
    }, 0);


    res.json({ valeurPatrimoine });
};


module.exports = {
    getPatrimoineAtDate,
    getPatrimoineInRange
};
