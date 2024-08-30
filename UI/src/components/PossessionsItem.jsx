import Button from 'react-bootstrap/Button';


export default function PossessionsItem({ possession, onDelete, onEdit}) {
  function formatDate(isoDate) {

    const date = new Date(isoDate);
    

    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    return new Intl.DateTimeFormat('fr-FR', options).format(date);
}
  return (
    <>
      <tr>
        <td>{possession.libelle}</td>
        <td>{possession.valeurConstante ? possession.valeurConstante : possession.valeur}</td>
        <td>{formatDate(possession.dateDebut)}</td>
        <td>{possession.dateFin ? formatDate(possession.dateFin) : "N/A"}</td>
        <td>{possession.tauxAmortissement ? possession.tauxAmortissement : "N/A"}</td>
        <td>{possession.dateFin <= possession.dateDebut ? "CLOSE" : "ACTIVE"}</td>
        <td>
          <Button className='ms-2' onClick={() => onEdit(possession)}>EDITER</Button>
          <Button className='ms-2'onClick={() => onDelete(possession.id)}>SUPPRIMER</Button>
        </td>
      </tr>
    </>
  );
}
