import classes from './post.module.css'
import newPost from "./newPost/newPost";
import React from 'react';
import {Field, reduxForm, reset} from 'redux-form';
import {required} from './../../../../utils/validators/validaor.js'
import {PostArea} from './../../../others/validate_textarea/validate_textarea.jsx';
import {addPost_ac} from "../../../../redusers/post_reducer";
import {connect} from "react-redux";
import { GlobalType } from '../../../../redux-store';
import {Dispatch} from "redux";
import NewPost from "./newPost/newPost";

const PostsForm = function (props : any) {
    function counter() {
    }

    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={PostArea} placeholder="Write some text..." maxLength="213" name='textarea'
                   className={classes.textarea} validate={required}
                   onChange={counter}/>
            <button className={classes.input}>Add post</button>
        </form>
    )
}
const PostsFormContainer = reduxForm({
    form: 'post_form'
})(PostsForm)


type Props = {
    reset : Function
    addPost : Function
    posts: Array<{message : string, id : number, liked : boolean, likes : number}>
    location : string
}

const Posts : React.FC<Props> = React.memo((props) => {
    const elements = props.posts.map((item, index) => <NewPost message={item.message} key={index}
                                                                        index={item.id} liked={item.liked}
                                                                        likes={item.likes}/>);

    function addPost(data : {textarea : string}) {
        props.addPost(data);
        props.reset()
    }

    return (
        <div className={classes.main}>
            {/*@ts-ignore*/}
            {props.location && <PostsFormContainer onSubmit={addPost}/>}
            <span className={classes.postCount}>Posts: {props.posts.length} </span>
            <div className={classes.newPostBlock}>
                {elements}
            </div>
        </div>
    )
})

let state_mtp = function (state : GlobalType,props : any) {
    return {
        posts: state.post.posts,
        location: props.location
    }
}
type propsType = {
    location: string
}

let dispatch_mtp = function (dispatch : Dispatch) {
    return {
        reset: function () {
            dispatch(reset('post_form'))
        },
        addPost: function (data: {textarea : string}) {
            dispatch(addPost_ac(data))
        }
    }
}
type dispatchType = {
    reset : Function
    addPost : Function
}

type stateType = {
    posts: Array<{message : string, id : number, liked : boolean, likes : number}>
}

export default connect<stateType,dispatchType,propsType,GlobalType>(state_mtp, dispatch_mtp)(Posts);
