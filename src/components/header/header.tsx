import classes from './header.module.css';
import avatar from './../../source/img/svg/unknown.jpg';
import {NavLink, Redirect, withRouter} from 'react-router-dom';
import {useState,useEffect} from 'react';
import logo from './../../source/img/svg/logo.svg'
import {useDispatch, useSelector} from "react-redux";
import {logout_tc} from "../../redusers/header-reducer";
import {GlobalType} from "../../redux-store";

type Props = {
	logined : boolean | undefined
	image : any
	user_name : string | null
	logout : Function
}

const Header=function(){
	let [redirect, openRedirect] = useState(false)
	function logout(){
		openRedirect(true)
		props.logout()
	}

	useEffect(() => () => openRedirect(false))

	const props : Props= {
		logined : useSelector((state : GlobalType) => state.app.logined),
		image : useSelector((state : GlobalType) => state.header.image),
		user_name : useSelector((state : GlobalType) => state.header.login),
		logout : () => dispatch(logout_tc())
	}

	const dispatch = useDispatch();

	return(
		<header>
			<div className={props.logined ? classes.logoutBlock : classes.reallyHidden}>
			<div className={classes.logout}
					onClick={logout}></div>
			<h4 className={classes.logoutTitle}>Log out</h4>
			</div>
			<div className={classes.logo}><img src={logo} alt=""/></div>
			<div className={classes.navbar}>
				<ul>
					<li><NavLink to={'/profile'}><div className={classes.home}></div></NavLink></li>
					<li><NavLink to={'/friends'}><div className={classes.friends}></div></NavLink></li>
					<li><NavLink to={'/messages'}><div className={classes.messages}></div></NavLink></li>
					<li><NavLink to={'/users'}><div className={classes.users}></div></NavLink></li>
					<li><NavLink to={'/news'}><div className={classes.news}></div></NavLink></li>
					<li><NavLink to={'/about'}><div className={classes.settings}></div></NavLink></li>
				</ul>
			</div>
  		<div className={props.logined ? classes.loginBlock : classes.hidden}>
  			<h4 className={classes.userName}>{props.user_name }</h4>
			{redirect && <Redirect to={'/login'} />}

		<NavLink to={'/profile'}>
			<img src={props.image ? props.image : avatar} alt="" className={classes.userImage}/></NavLink>
  		</div>
			{!props.logined && <NavLink to={'/login'} className={classes.login}>
				<h4 className={classes.loginTitle}>login</h4></NavLink>}
  		</header>
		)
}




export default Header