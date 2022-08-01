import React, { FC } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import {ReactNode} from 'react';
import { Divider } from '@mui/material';
import styles from '../../styles/Layout.module.css';
interface IProps{
    children:ReactNode;
}
const Layout :FC<IProps>= ({children}) => {
    return (
        <div className={styles.layout}>
        <NavBar/>
        <Divider/>
<main>{children}</main>
<Footer/>
        </div>
    );
};

export default Layout;