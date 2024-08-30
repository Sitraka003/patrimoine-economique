import React from "react";
import './editPossession.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Possession from "../../../models/possessions/Possession";
import Flux from "../../../models/possessions/Flux";
import axios from "axios";

export function ToggleEdit() {
    const edit = document.querySelector('.modification');
    edit.classList.toggle('toggledEdit');
}

function EditPossession(){

    const [data, setData] = useState(null);
    const [possessions, setPossessions] = useState([]);

    return(
        <>
        <div className="modification">
        <form>
        <button type="button" className="btn btn-warning fermer2" onClick={ToggleEdit}>x</button>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Libelle</label>
        <input type="text" class="form-control" id="exampleInputEmail1"></input>
      </div>
      <div className="mb-3">
        <label for="exampleInputPassword1" className="form-label">Date de fin</label>
        <input type="date" className="form-control" id="exampleInputPassword1"></input>
      </div>
      <button type="submit" className="btn btn-secondary">Modifier</button>
    </form>
        </div>
        </>
    )
   
}

export default EditPossession