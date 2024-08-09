import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";

function ShowTable() {
  const [patrimoine, setPatrimoine] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          "https://raw.githubusercontent.com/Liantsoa1/patrimoine-economique/main/data/data.json"
        )
        .then(function (response) {
          const patrimoinesData = response.data.find(
            (item) => item.model === "Patrimoine"
          );
          setPatrimoine(patrimoinesData.data.possessions);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    };

    fetchData();
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>libelle</th>
          <th>valeur initiale</th>
          <th>date de debut</th>
          <th>date de fin</th>
          <th>amortissemnt</th>
          <th>valeur actuelle</th>
        </tr>
      </thead>
      <tbody>
        {patrimoine.map((possession, index) => (
          <tr key={index}>
            <td>{index}</td>
            <td>{possession?.libelle}</td>
            <td>{possession?.valeur}</td>
            <td>{possession?.dateDebut}</td>
            <td>{possession?.dateFin}</td>
            <td>{possession?.tauxAmortissement}</td>
            <td>{index}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ShowTable;
