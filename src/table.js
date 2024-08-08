import Table from "react-bootstrap/Table";

function ShowTable() {
  return (
    <Table striped bordered hover >
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
        <tr>
          <td>1</td>
          <td>Ordinateur</td>
          <td>5000</td>
          <td>@mdo</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
        <td>1</td>
          <td>Ordinateur</td>
          <td>5000</td>
          <td>@mdo</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
        <td>1</td>
          <td>Ordinateur</td>
          <td>5000</td>
          <td>@mdo</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default ShowTable;
