import classes from './aside.module.css';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {setProfile_tc as setProfile} from '../../redusers/post_reducer';
import {clearProfilePartially_ac as clearProfilePartially} from "../../redusers/post_reducer";
import {GlobalType} from "../../redux-store";

type Props = {
    current_user_id: number | null,
    setProfile: Function
    clearProfilePartially: Function
}

const Aside: React.FC<Props> = function (props) {
    function getProfile() {
        // debugger
        props.clearProfilePartially()
        props.setProfile(props.current_user_id, props.current_user_id)
    }

    return (
        <aside className={classes.mainAside}>
            <div className={classes.asideBlock}>
                <ul>
                    <li><NavLink to="/profile" activeClassName={classes.active} onClick={getProfile}
                                 className={classes.AsideA}>
                        <div className={classes.home + " " + classes.icon}></div>
                        <h2 className={classes.title}>Profile</h2></NavLink></li>
                    <li><NavLink to="/friends" activeClassName={classes.active} className={classes.AsideA}>
                        <div className={classes.friendsIcon + " " + classes.icon}></div>
                        <h2 className={classes.title}>Friends</h2></NavLink></li>
                    <li><NavLink to="/messages" activeClassName={classes.active} className={classes.AsideA}>
                    <div className={classes.messages + " " + classes.icon}></div>
                    <h2 className={classes.title}>Messages</h2></NavLink></li>
                    <li><NavLink to='/users' activeClassName={classes.active} className={classes.AsideA}>
                        <div className={classes.users + " " + classes.icon}></div>
                        <h2 className={classes.title}>Users</h2></NavLink></li>

                    <li><NavLink to="/news" activeClassName={classes.active} className={classes.AsideA}>
                        <div className={classes.news + " " + classes.icon}></div>
                        <h2 className={classes.title}>News</h2></NavLink></li>
                    <li><NavLink to="/about" activeClassName={classes.active} className={classes.AsideA}>
                        <div className={classes.settings + " " + classes.icon}></div>
                        <h2 className={classes.title}>About</h2></NavLink></li>

                </ul>
            </div>
            `
        </aside>

    )
}
let mstp = function (state: GlobalType) {
    return {
        current_user_id: state.header.user_id
    }
}
type stateType = {
    current_user_id: number | null
}
type dispatchType = {
    setProfile: Function
    clearProfilePartially: () => void
}


export default connect<stateType, dispatchType, {}, GlobalType>
(mstp, {setProfile, clearProfilePartially})(Aside)