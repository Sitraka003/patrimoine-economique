import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
    return (
        <div className="container border border-2 border-primary px-100">
            <table class="table table-secondary">
                <thead>
                    <tr>
                        <th scope="col">Libellé</th>
                        <th scope="col">Valeur initiale</th>
                        <th scope="col">Date début</th>
                        <th scope="col">Date fin</th>
                        <th scope="col">Amortissement</th>
                        <th scope="col">Valeur actuelle</th>
                    </tr>
                </thead>
            </table>
        </div>
    )
}

function Valider() {
    return (
        <button onClick={() => {
            alert("hello");
        }
        }>Valider</button>
    )
}