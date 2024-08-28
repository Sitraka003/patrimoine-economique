import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Possession from '../../../../models/possessions/Possession';
import Flux from '../../../../models/possessions/Flux';
import axios from 'axios';

function PossessionPage() {
    const [data, setData] = useState(null);
    const [possessions, setPossessions] = useState([]);
    const [datePicker, setDatePicker] = useState();
    const [patrimonyValue, setPatrimonyValue] = useState(0);
    const [arrayResult, setArrayResult] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3500/possession')
            .then((response) => {
                const data = response.data;
                setData(data);
                if (data && data[1] && Array.isArray(data[1].data.possessions)) {
                    instancing(data[1].data.possessions);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    function instancing(possessionsData) {
        const newPossessions = possessionsData.map((oneData) => {
            if (oneData.libelle === "Alternance" || oneData.libelle === "Survie") {
                return new Flux(
                    oneData.possesseur.nom,
                    oneData.libelle,
                    oneData.valeur,
                    new Date(oneData.dateDebut),
                    oneData.dateFin,
                    oneData.tauxAmortissement || "0",
                    oneData.jour,
                    oneData.valeurConstante
                );
            }
            return new Possession(
                oneData.possesseur.nom,
                oneData.libelle,
                oneData.valeur,
                new Date(oneData.dateDebut),
                oneData.dateFin,
                oneData.tauxAmortissement || 0
            );
        });
        setPossessions(newPossessions);
    }

    function getDatePicker(e) {
        setDatePicker(e.target.value);
    }

    function getNewValue() {
        const date = new Date(datePicker);
        const values = possessions.map((possession) => possession.getValeurApresAmortissement(date));
        const results = values.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
        setPatrimonyValue(results);
    }

    useEffect(() => {
        if (possessions.length > 0) {
            getActualValue();
        }
    }, [possessions]);

    function getActualValue() {
        const today = new Date();
        const results = possessions.map(possession => {
            if (possession.libelle === "Alternance" || possession.libelle === "Survie") {
                const month = today.getMonth() - possession.dateDebut.getMonth();
                return (possession.valeur + possession.valeurConstante * month);
            } else {
                return possession.getValeurApresAmortissement(today);
            }
        });
        setArrayResult(results);
    }

    function ShowList(props) {
        const { possessions, arrayResult } = props;

        return (
            <tbody>
                {possessions.map((possession, i) => (
                    <tr key={i}>
                        <td>{possession.libelle}</td>
                        <td>{possession.valeur}</td>
                        <td>{possession.dateDebut.toDateString()}</td>
                        <td>{possession.dateFin ? possession.dateFin.toDateString() : 'inconnue'}</td>
                        <td>{possession.tauxAmortissement}</td>
                        <td>{arrayResult[i]}</td>
                    </tr>
                ))}
            </tbody>
        );
    }

    return (
        <>
            <div className="inputContainer">
                <div className="input-group mb-3 oneInput">
                    <span className="input-group-text oneSpan" id="inputGroup-sizing-default">Date Picker</span>
                    <input 
                        type="date" 
                        className="form-control" 
                        aria-label="Sizing example input" 
                        aria-describedby="inputGroup-sizing-default" 
                        onChange={getDatePicker}
                    />
                </div>
                <button 
                    type="button" 
                    className="btn btn-primary bouton" 
                    onClick={getNewValue}>
                    Calculer
                </button>
                <div className='resultats'>
                    LA VALEUR DU PATRIMOINE : {patrimonyValue} Ariary
                </div>
            </div>
            <table className="table table-dark table-striped tableau">
                <thead>
                    <tr>
                        <th scope="col">Libelle</th>
                        <th scope="col">Valeur initiale</th>
                        <th scope="col">Date de début</th>
                        <th scope="col">Date de fin</th>
                        <th scope="col">Amortissement</th>
                        <th scope="col">Valeur actuelle</th>
                    </tr>
                </thead>
                <ShowList possessions={possessions} arrayResult={arrayResult} />
            </table>
        </>
    );
}

export default PossessionPage;
