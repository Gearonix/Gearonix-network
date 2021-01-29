export const required = function(value){
	if (!value){
		return 'Enter something'
	}
}




export const email_login_val = function(value){
	//f debugger
	if (!value){
		return 'Please, enter email'
	}
	if (!value.includes('@')){
		return 'Please enter a real email'
	}
	return null
}
export const password_login_val= function(value){
	if (!value){
		return 'Please, enter password'
	}
}
export const change_status_val = function (value){
	if (!value){
		return  'name is required'
	}
}
export function MaxLength300(value){
		// debugger
		if (!value){
			return
		}
		if (value.length>299){
			// debugger
			return `Max length - ${300} symbols`
		}
	}
