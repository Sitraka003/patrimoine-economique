import './css/style.css';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


export default function Menu() {
    return (
        <div className='body'>
            <div>
                <h2>MENU</h2>
                <div>
                    <Link to="/possession">
                        <Button >Possession</Button>
                    </Link>
                    <Link to="/patrimoine">
                        <Button >Patrimoine</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}