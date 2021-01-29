import classes from './about.module.css';

const About=function(){
	return(
		<div className={classes.main}>
			<h2 className={classes.title}>About</h2>
			<p className={classes.about}>The project was developed in React on 12/24/2020.
				For all questions in my telegram (Geaonix).
				</p>
			<h3 className={classes.goodluck}>Good luck!</h3>
			<div className={classes.image}></div>
		</div>
		//code...
		)
}





export default About