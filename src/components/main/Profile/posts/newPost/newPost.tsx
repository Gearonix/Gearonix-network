import classes from './newPost.module.css';
import kotek from './../../../../../source/img/svg/user.png';
import React from "react";
import {getLike_ac as like} from "../../../../../redusers/post_reducer";
import {connect} from "react-redux";
import {GlobalType} from "../../../../../redux-store";

type Props = {
    photo: string | null
    message: string
    key: number
    index: number
    liked: boolean
    likes: number
    like : Function
}
const NewPost : React.FC<Props> = function (props) {
    return (
        <div className={classes.newPost}>
            <div className={classes.avatarBlock}>
                <img src={props.photo ? props.photo : kotek} alt="" className={classes.avatar}/>
            </div>
            <div className={classes.mainBlock}>
                <div className={classes.text}>
                    <span>{props.message}</span>
                </div>
                <div className={classes.likesBlock}>
                    <div className={props.liked ? classes.liked : classes.test
                    } onClick={() => props.like(props.index)
                    }><span className={classes.likesCount}>{props.likes}</span></div>
                </div>
            </div>
        </div>
    )
}

const state_mtp = function (state: GlobalType, props : any) {
    return {
        message: props.message,
        index: props.index,
        liked: props.liked,
        likes: props.likes,
        photo: state.header.image
    }
}
type stateType = {
    photo: string | null
}
type propsType = {
    message: string
    index: number
    liked: boolean
    likes: number
}
type DispatchType = {
    like: Function
}
// <{message : string, id : number, liked : boolean, likes : number}>

export default connect<stateType, DispatchType, propsType, GlobalType>(state_mtp, {like})(NewPost);
