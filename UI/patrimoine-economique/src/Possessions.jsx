import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


function TablePossession() {
  return (
    <div className="d-flex flex-column justify-content-evenly m-5">
      <Table responsive="xl" className="w-100 table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Libelle</th>
            <th>Valeur</th>
            <th>Début</th>
            <th>Fin</th>
            <th>Amortissement</th>
            <th>Valeur Actuelle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>PC</td>
            <td>10000</td>
            <td>2024-01-01</td>
            <td>2024-12-31</td>
            <td>5%</td>
            <td>950</td>
            <td>
              <Link to={`/possessions/edit/example`} >
                <Button variant="primary" className="me-2">Edit</Button>
              </Link>
              <Button variant="danger">Close</Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <div className='d-flex flex-column align-items-center justify-content-evenly mt-5'>
        <Link to="/possessions/create">
          <Button variant="success">Create Possession</Button>
        </Link>
      </div>
    </div>
  );
}

function Possessions() {
  /*const [possessions, setPossessions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPossessions = async () => {
      try {
        const response = await axios.get('/possession');
        // Ensure that response.data is an array
        if (Array.isArray(response.data)) {
          setPossessions(response.data);
        } else {
          setError('Unexpected response format');
        }
      } catch (error) {
        setError('Error fetching possessions');
        console.error('Error fetching possessions:', error);
      }
    };

    fetchPossessions();
  }, []);

  const handleClose = async (libelle) => {
    try {
      await axios.post(`/possession/${libelle}/close`);
      // Update local state to reflect changes
      setPossessions(possessions.filter(possession => possession.libelle !== libelle));
    } catch (error) {
      console.error('Error closing possession:', error);
    }
  };

  return (
    <div>
      <h1>Possessions</h1>
      <Link to="/possessions/create">
        <button>Create Possession</button>
      </Link>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Libelle</th>
            <th>Valeur</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Taux</th>
            <th>Valeur actuelle</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(possessions) && possessions.length > 0 ? (
            possessions.map(possession => (
              <tr key={possession.libelle}>
                <td>{possession.libelle}</td>
                <td>{possession.valeur}</td>
                <td>{possession.dateDebut}</td>
                <td>{possession.dateFin}</td>
                <td>{possession.taux}</td>
                <td>{possession.valeurActuelle}</td>
                <td>
                  <Link to={`/possessions/${possession.libelle}/update`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => handleClose(possession.libelle)}>Close</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No possessions found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );*/

}

//export default Possessions;
export default TablePossession;
