import classes from './GlobalError.module.css';
import {useState} from "react";


const GlobalError = function (){
    let [animate,getAnimate] = useState(false)
    let [visibile, show] = useState(true)
    function hide(){
        getAnimate(true)
        setTimeout(() => show(false),400)
    }
    let animation = animate ? classes.animate : ''
    return(
        visibile && <div className={classes.main+' '+animation}>
            <div className={classes.cross} onClick={hide}></div>
            <h2 className={classes.title}>Something went wrong</h2>
            <div className={classes.image}></div>
            <p className={classes.message}>
                You may be doing too many things, please stop
            </p>
        </div>
    )
}

export default GlobalError