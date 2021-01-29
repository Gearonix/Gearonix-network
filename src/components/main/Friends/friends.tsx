import classes from './friends.module.css';
import {connect} from "react-redux";
import NewUserContainer from '../Users/NewUser/NewUserContainer';
import * as React from "react";
import {
    setFriends_tc as setFriends,
    showmore_tc as showmore,
    search_tc as search,
    cancel_tc as cancel,
    removeFriend_tc as removeFriend
} from '../../../redusers/friends_reducer'
import Preloader from "../../others/preloader";
import {Search} from '../Users/users';
import {GlobalType} from "../../../redux-store";
import {useEffect} from "react";

type Props = {
    friends: Array<{
        followed : boolean
        id : number
        name : string
        photos : {small : null | string, large : null | string}
        status : null | string
        uniqueUrlName : null | string
    }>
    size: number
    page: number
    showmore_hidden: boolean
    preloader: boolean
    setFriends: Function
    showmore: Function
    search: Function
    cancel: Function
    removeFriend: Function
}

const Friends: React.FC<Props> = function (props) {
    function mount() {
        props.setFriends(props.size)
    }
    useEffect(mount, [])
    let elements = props.friends.map((item, index) => {
        if (!item.id) {
            return
        }
        return <NewUserContainer key={item.id} name={item.name} description={item.status}
                                 id={item.id} user_image={item.photos.large} friend={true}
                                 removeFriend={props.removeFriend}
                                 page={props.page} size={props.size} list={props.friends}/>
    });
    // if (props.preloader) {
    //     return <Preloader/>
    // }
    return (
        <div className={classes.main}>
            <h2 className={classes.title}>Friends</h2>
            <Search search={props.search} cancel={() => props.cancel(props.size)}
                    show={!props.showmore_hidden}/>
            { !props.preloader ?
            <>
            {elements}
            {props.friends.length == 0 && <h2 className={classes.nousers}>No users</h2>}
            {!props.showmore_hidden &&
            <button onClick={() => props.showmore(props.page, props.size)}
                    className={classes.showmore}>Show more</button>}
            </>
            : <Preloader />}
        </div>
    )
}


let state_mtp = function (state: GlobalType) {
    return {
        friends: state.friends.list,
        size: state.friends.size,
        page: state.friends.page,
        showmore_hidden: state.friends.showmore,
        preloader: state.friends.preloader,
    }
}

type stateType = {
    friends: Array<{
        followed : boolean
        id : number
        name : string
        photos : {small : null | string, large : null | string}
        status : null | string
        uniqueUrlName : null | string
    }>
    size: number
    page: number
    showmore_hidden: boolean
    preloader: boolean
}
type DispatchType = {
    setFriends: Function
    showmore: Function
    search: Function
    cancel: Function
    removeFriend: Function
}

export default connect<stateType, DispatchType, {}, GlobalType>
(state_mtp, {
    setFriends, showmore, search, cancel,
    removeFriend
})(Friends)