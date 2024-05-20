import React from 'react';
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div className={classes.header}>
            <NavLink to="/" activeClassName={classes.active} className={classes.headings}>
                <h1 className={classes.Heading}>Expense Tracker</h1>
            </NavLink>
            <nav className={classes.nav}>
                <ul className={classes.navList}>
                    <li>
                        <NavLink to="/login" activeClassName={classes.active}>
                            Login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/signup" activeClassName={classes.active}>
                            Signup
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;
