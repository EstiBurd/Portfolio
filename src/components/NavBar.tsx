import NavBarColorTabs from './NavBarColorTabs';
import styles from '../../styles/NavBar.module.css';
const NavBar = () => {
    return (
        <div className={styles.NavBar}>
            <h1>SPWS</h1>
            <NavBarColorTabs/>
        </div>
    );
};

export default NavBar;