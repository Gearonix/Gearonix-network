import classes from './validate_textarea.module.css';

export const PostArea = function({input,meta,...props}){
	let throw_error = !meta.active && meta.error && meta.touched
	// console.log(throw_error)
	// debugger
	return(
		<div>
			<textarea {...input} {...props}></textarea>
			<span className={throw_error ? classes.postSpan : classes.hidden }>{meta.error}</span>
		</div>
	)
}


export const SearchInput = function({input,meta,...props}){
	//de
	// debugger
	let throw_error = meta.error && meta.touched && !meta.active
	return(
		<div className={classes.searchMain}>
		<input {...input}{...props} ></input>
		</div>
		)
}



export const Input = function({input,meta,...props}){
	let throw_error = !meta.active && meta.error && meta.touched
	// 
	// console.log(meta.error)
	return(
		<div className={throw_error ? classes.error : null}>
		<input {...input} {...props} />
		<span className={throw_error ? classes.span : classes.hidden}>{meta.error}</span>
		</div>
		)
}

export const InfoDesk = function ({input,meta,...props}){
	// debugger
	return (
		<div className={meta.error ? classes.error : null}>
		<textarea {...input} {...props}></textarea>
		<span className={meta.error ? classes.span : classes.hidden}>{meta.error}</span>
		</div>
	)
}