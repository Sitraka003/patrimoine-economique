import './css/style.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function Navbar(){
    return(
        <div className='navbar'>
                <Link to="/">
                        <Button variant='secondary'>Menu</Button>
                    </Link>
        </div>
    );
}