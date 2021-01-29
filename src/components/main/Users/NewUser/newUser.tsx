import users_style from './NewUser.module.css';
import {NavLink} from 'react-router-dom';
import avatar from './../../../../source/img/svg/unknown.jpg';
import friends_style from './../../Friends/newFriend/newFriend.module.css';
import {connect} from "react-redux";
import {followTC as follow, unfollowTC as unfollow} from "../../../../redusers/users_reducer";
import {clearProfilePartially_ac as clearProfilePartially} from "../../../../redusers/post_reducer";
import React from "react";
import {GlobalType} from "../../../../redux-store";

type Props = {
    followLoading: boolean
    key: any
    name: string
    description: string
    location?: string
    followed?: boolean
    id: number
    user_image: string
    followError?: any
    loadingButton: null | number
    follow: Function
    unfollow: Function
    clearProfilePartially: Function
    friend: boolean
    page: undefined | number
    size: undefined | number
    list: undefined | Array<any>
    removeFriend ?: Function
}


const NewUser: React.FC<Props> = function (props) {
    let classes;
    if (!props.friend) {
        classes = users_style
    } else {
        classes = friends_style
    }

    function removeFriend(id: number, page: number | undefined,
                          size: number | undefined, list: Array<any> | undefined,
                          isFriend: boolean) {
        props.unfollow(id, page, size, list, isFriend)
    }

    let followError = props.id == props.followError ? true : false
    let isDisabled = props.id === props.loadingButton ? props.followLoading ? true : false : false
    let class_isDisabled = isDisabled ? classes.isDisabled : null
    return (
        <div className={classes.main}>
            <div className={classes.block1}>
                {/*@ts-ignore*/}
                <NavLink to={`/profile/${props.id}`} onClick={props.clearProfilePartially}
                         className={classes.userImage}><img src={props.user_image ? props.user_image : avatar}
                                                            className={classes.image} alt={''}/></NavLink>

                {!props.friend &&
                <button onClick={props.followed ? () => props.unfollow(props.id) : () => props.follow(props.id)}
                        className={!props.followed ? classes.button : classes.removeButton + ' ' + class_isDisabled}>{!followError ? isDisabled ? 'Loading...' : !props.followed ? 'Add friend' : 'Remove' : 'Error'}</button>}

            </div>
            <div className={classes.block2}>
                <h2 className={classes.name}>{props.name}</h2>
                <p className={classes.description}>{props.description}</p>
            </div>
            <div className={classes.block3}>
                {props.friend &&
                <button onClick={() => removeFriend(props.id, props.page, props.size, props.list, true)}
                        className={isDisabled ? classes.buttonDisabled : classes.removeFriend}>{isDisabled ? 'Loading...' : 'Delete friend'}</button>}
                {props.friend &&
                <button onClick={() => removeFriend(props.id, props.page, props.size, props.list, true)}
                        className={isDisabled ? classes.buttonDisabledResponsive : classes.removeFriendResponsive}>{isDisabled ? '...' : '-'}</button>}
            </div>
        </div>
    )
}
let state = function (state: GlobalType,props : any) {
    return {
        followLoading: state.users.followLoading,
        loadingButton: state.users.loadingButton,
        key: props.key,
        name: props.name,
        description: props.description,
        location: props.location,
        followed: props.followed,
        id: props.id,
        user_image: props.user_image,
        followError: props.followError
    }
}
type propsType = {
    key: any
    name: string
    description: string
    location?: string
    followed?: boolean
    id: number
    user_image: string
    followError?: any
    friend: boolean
    page: null | number
    size: null | number
    list: null | Array<any>
    removeFriend ?: Function
}
type stateType = {
    followLoading: boolean
    loadingButton: null | number
}
type dispatchType = {
    follow: Function
    unfollow: Function
    clearProfilePartially: Function
    removeFriend ?: Function
}

 // "key" | "name" |
// "description" | "location" | "followed" | "id" | "user_image" | "followError" |
// "friend" | "page" | "size" | "list">
export default connect<stateType, dispatchType, propsType, GlobalType>
(state, {follow, unfollow, clearProfilePartially})(NewUser);
