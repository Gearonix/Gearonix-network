import classes from './login.module.css'
import {reduxForm, Field} from 'redux-form';
import {Input} from './../../others/validate_textarea/validate_textarea.jsx';
import {email_login_val, password_login_val} from './../../../utils/validators/validaor.js';
import {Redirect} from 'react-router-dom';
import React from 'react';
import {connect} from "react-redux";
import {login_tc as login} from "../../../redusers/header-reducer";
import {GlobalType} from "../../../redux-store";


const LoginForm = function (props: any) {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={classes.loginBlock}>
                <h4 className={classes.inputTitle}>Email</h4>
                <Field type="text" component={Input} name='email'
                       validate={email_login_val} className={classes.input} autoComplete={'off'}/><br/>

                <h4 className={classes.inputTitle}>Password</h4>
                <Field type="password" placeholder='password' component={Input}
                       name='password' validate={password_login_val} className={classes.input}
                       autoComplete={'off'}/><br/>
            </div>
            <div className={props.error ? classes.error : classes.hidden}>
                <span>{props.error}</span>
            </div>

            <button className={classes.loginButton}>Login</button>
        </form>

    )
}

const LoginFormContainer = reduxForm({
    form: 'login_form'
})(LoginForm)

type Props = {
    processed: boolean
    logined: boolean | undefined
    login: Function
}

const Login: React.FC<Props> = function (props) {
    // debugger
    if (props.logined === true && props.processed === true) {
        return <Redirect to={'/profile'}/>
    }

    const login = (data: any) => {
        props.login(data)
    }
    return (
        <div className={classes.main}>
            <h2 className={classes.title + ' ' + classes.titleFirst}>Hello.</h2>
            <h2 className={classes.title}>Welcome back</h2>
            <LoginFormContainer onSubmit={login}/>

        </div>
    )
}

let mapStateToProps = function (state: GlobalType) {
    return {
        logined: state.app.logined,
        processed: state.app.initialized
    }
}
type stateType = {
    processed: boolean,
    logined: boolean | undefined,
}
type dispatchType = {
    login: Function
}



export default connect<stateType, dispatchType, {}, GlobalType>(mapStateToProps, {login})(Login)