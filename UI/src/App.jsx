import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import getData from "../../backend/data/main";
import Possession from "../../models/possessions/Possession";
import Patrimoine from "../../models/Patrimoine";

export default function App() {
  const [possessions, setPossessions] = useState([]);
  const [dateActuelle, setDateActuelle] = useState(new Date());
  const [valeurPatrimoine, setValeurPatrimoine] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getData();

      const monPatrimoine = data.filter((item) => item.model === "Patrimoine");

      const possessionsData = monPatrimoine.flatMap((p) => p.data.possessions);

      const possessionsInstances = possessionsData.map(
        (item) =>
          new Possession(
            item.possesseur.nom,
            item.libelle,
            item.valeur,
            new Date(item.dateDebut),
            item.dateFin ? new Date(item.dateFin) : null,
            item.tauxAmortissement
          )
      );
      setPossessions(possessionsInstances);
    }

    fetchData();
  }, []);

  const handleDateChange = (date) => {
    setDateActuelle(date);
  };

  const handleValiderClick = () => {
    const patrimoine = new Patrimoine("John Doe", possessions);
    const valeurTotale = patrimoine.getValeur(dateActuelle);
    setValeurPatrimoine(valeurTotale);
  };

  return (
    <div className="container-fluid px-100">
      <h1 className="text-center my-5">Patrimoine x</h1>
      <table className="table mb-4">
        <thead className="table-dark">
          <tr>
            <th>Libellé</th>
            <th>Valeur initiale</th>
            <th>Date début</th>
            <th>Date fin</th>
            <th>Amortissement</th>
            <th>Valeur actuelle</th>
          </tr>
        </thead>
        <tbody>
          {possessions.map((possession, index) => (
            <tr key={index}>
              <td>{possession.libelle}</td>
              <td>{possession.valeur.toFixed(2)}</td>
              <td>{possession.dateDebut.toLocaleDateString()}</td>
              <td>
                {possession.dateFin
                  ? possession.dateFin.toLocaleDateString()
                  : "-"}
              </td>
              <td>
                {possession.tauxAmortissement
                  ? `${possession.tauxAmortissement}%`
                  : "-"}
              </td>
              <td>{possession.getValeur(dateActuelle).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mb-3 d-flex">
        <label htmlFor="date-input" className="fs-5 me-2">
          Afficher la valeur du patrimoine à la date :
        </label>
        <DatePicker
          selected={dateActuelle}
          onChange={handleDateChange}
          dateFormat="yyyy/MM/dd"
          className="form-control text-center w-75 pe-0"
        />
        <button className="btn btn-secondary px-4" onClick={handleValiderClick}>
          Valider
        </button>
      </div>
      <div className="d-flex">
        <h4 className="pe-3">=&gt;</h4>
        {valeurPatrimoine !== null && (
          <div>
            <h4>{valeurPatrimoine.toFixed(2)}</h4>
          </div>
        )}
      </div>
    </div>
  );
}
