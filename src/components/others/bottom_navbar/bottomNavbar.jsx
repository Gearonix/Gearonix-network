import {NavLink} from "react-router-dom";
import classes from './bottomNavbar.module.css';

const BottomNavbar = function (){
    return(
        <div className={classes.main}>
            <div className={classes.navbarBlock}>
                <ul>
                    <li><NavLink to={'/profile'}><div className={classes.home}></div></NavLink></li>
                    <li><NavLink to={'/friends'}><div className={classes.friends}></div></NavLink></li>
                    <li><NavLink to={'/users'}><div className={classes.users}></div></NavLink></li>
                    <li><NavLink to={'/messages'}><div className={classes.messages}></div></NavLink></li>
                    <li><NavLink to={'/news'}><div className={classes.news}></div></NavLink></li>
                    <li><NavLink to={'/about'}><div className={classes.settings}></div></NavLink></li>
                </ul>
            </div>
        </div>
    )
}
export default BottomNavbar