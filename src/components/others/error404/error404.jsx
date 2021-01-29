import classes from './error404.module.css';

const Error404 =function (){
    return(
        <div className={classes.main}>
            <h2 className={classes.title}>Sorry, page not found</h2>
            <div className={classes.image}></div>
        </div>
    )
}

export default Error404