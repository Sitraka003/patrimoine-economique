import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import './App.css';
import AddInput from './components/affichage/AddInput';

function App() {
  return <>
    <div className="container">
      <div className='title-container'>
        <h3>Patrimoine</h3>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Libelle</th>
            <th>Valeur Initial</th>
            <th>Date Debut</th>
            <th>Date Fin</th>
            <th>Ammortisement</th>
            <th>Valeur Actuelle</th>
          </tr>
        </thead>
        <tbody>
        <button className='add-btn' onClick={AddInput}>add</button>
          
        </tbody>
      </Table>
    </div>
  </>
}

export default App;