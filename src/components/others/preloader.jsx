import classes from './preloader.module.css'
import {useEffect,useState} from 'react';

const Preloader=function(){
	let [redirect,openRedirect] = useState(false)
	function mount(){
		let time = setTimeout(() => openRedirect(true),5000)
		return function (){
			// console.log('CLEAR')
			clearTimeout(time)
		}
	}
	useEffect(mount)
	return(
		<div className={classes.main}>
	{!redirect && <div className={classes.preloader}></div>}
	{redirect && <ErrorInternetDisconnected/>}
		</div>
		)
}

const ErrorInternetDisconnected = function (){
	return(
		<div className={classes.main}>
			<h2 className={classes.title}>No internet connection :(</h2>
			<div className={classes.image}></div>
		</div>
	)
}



export default Preloader;