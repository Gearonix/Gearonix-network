import classes from './main.module.css';
import React, {useEffect} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import About from './About/about';
import Users from './Users/users';
import News from './News/news';
import Error404 from './../others/error404/error404';
import FriendsContainer from './Friends/friends';
import {connect} from "react-redux";
import GlobalError from './../others/GlobalError/GlobalError'
import BottomNavbar from "./../others/bottom_navbar/bottomNavbar";
import Profile from "./Profile/proflile";
import Messages from "./Messages/Messages";
import Login from "./Login/login";
import {GlobalType} from "../../redux-store";
import {setProfile_tc as setProfile} from "../../redusers/post_reducer";

type Props = {
    error : boolean
    user_id : number | null
    setProfile : Function
}

const Main : React.FC<Props>= function (props) {
    function mount(){
        props.setProfile(props.user_id,props.user_id)
    }
    useEffect(mount,[])
    return (
        <main className={classes.main}>
            {/*@ts-ignore*/}
            {props.error && <GlobalError/>}
            <Switch>

                <Route exact path="/messages" component={Messages}/>
                <Route exact path="/profile/:userId?" component={Profile}/>
                <Route exact path="/news" component={News}/>
                <Route exact path="/about" component={About}/>
                <Route exact path='/users' component={Users}/>
                <Route exact path={'/friends'} component={FriendsContainer}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path={'/'} render={() => <Redirect to={'/profile'}/>}/>
                <Route component={Error404}/>
                {/*<Profile />*/}
                {/*<Messages />*/}
            </Switch>
            <BottomNavbar/>
        </main>
    )
}

let state = function (state : GlobalType) {
    return {
        error: state.app.error,
        user_id : state.header.user_id
    }
}

type stateType = {
    error : boolean
    user_id : number | null
}
type dispatchType = {
    setProfile : Function
}


export default connect<stateType,dispatchType,{},GlobalType>(state, {setProfile})(Main)
