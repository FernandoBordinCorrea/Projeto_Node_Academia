import {Link} from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import styles from './Navbar.module.css';
import { Context } from '../../context/UserContext';
import { useContext } from 'react';

function Navbar(){

    const { authenticated } = useContext(Context);

    return(
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src={logo} alt="Logo do site"/>
                <h2>Monitoramento de exercícios</h2>
            </div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {authenticated ? (
                    <>
                        <p>Logado</p>
                    </>
                    ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                )}
                
            </ul>
        </nav>
    )
}

export default Navbar