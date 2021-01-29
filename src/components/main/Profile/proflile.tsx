import classes from './profile.module.css';
import React, {useState, useEffect} from 'react';
import logo from './../../../source/img/svg/unknown.jpg';
import {Redirect, withRouter} from 'react-router-dom';
import ProfileInfo from './info/profile_info'
import Preloader from "../../others/preloader";
import {connect} from "react-redux";
import {
    addImage_tc as addImage, change_profile_tc as changeProfile,
    getStatus_tc as getStatus,
    setProfile_tc as setProfile, updateStatus_tc as updateStatus
} from "../../../redusers/post_reducer";
import {GlobalType} from "../../../redux-store";
import Post from './posts/post'

const Profile = function (props: any) {
    let [info, openinfo] = useState(false)
    let id = props.match.params.userId || props.current_user_id;

    function mount() {
        props.getStatus(id, props.current_user_id)
        props.setProfile(id, props.current_user_id)
    }
    useEffect(mount, [props.description])

    if (props.logined == false && props.processed == true) {
        if (id != props.match.params.userId || id == null && props.match.params.userId == undefined) {
            return <Redirect to={'/login'}/>
        }
    }

    if (!props.contacts || !props.photo) {
        // @ts-ignore
        return <Preloader className={classes.preloader}/>
    }
    if (!id) {
        // @ts-ignore
        return <Preloader className={classes.preloader}/>
    }
    function showInfo() {
        openinfo(!info)
    }
    let openInfo = info ? <div><ProfileInfo activate={showInfo} changeProfile={props.changeProfile}
    updateStatus={props.updateStatus} addImage={props.addImage} profile={props.profile}
    userId={props.userId} userImage={props.userImage}
    />
    </div> : null
    return (
        <div className={classes.profile}>
            <div className={classes.backBlack}>
                <div className={classes.userAvatar}><img src={props.photo.large != null ? props.photo.large : logo}
                                                         alt=""/></div>
                <h1 className={classes.userName}>{props.name}</h1>
            </div>
            <div className={classes.mainBlock}>
                <div className={classes.profile}>
                    <div className={classes.mainBlockOther}>
                        {!props.match.params.userId &&
                        <div className={classes.changeProfileContainer} onClick={showInfo}>
                            <div className={classes.polygon1}></div>
                            <div className={classes.changeStatusBlock}>
                                <h3 className={classes.changeProfileTitle}>change profile</h3>
                            </div>
                            <div className={classes.polygon2}></div>
                        </div>}
                        {openInfo}
                        <div className={classes.info}>
                            <div className={classes.description_wrapper}>
                                {props.description && <div className={classes.case}></div>}
                                <p className={classes.description}>{props.description}</p></div>
                            <ul>
                            </ul>
                        </div>
                    </div>

                </div>
                {/*@ts-ignore*/}
                <Post location={props.logined == true && props.processed == true}/>
            </div>
        </div>

    )


}

let state = function (state: GlobalType) {
    return {
        name: state.post.profile.fullName,
        description: state.post.profile.aboutMe,
        photo: state.post.profile.photos,
        lookingForAJob: state.post.profile.lookingForAJob,
        lookingForAJobDescription: state.post.profile.lookingForAJobDescription,
        contacts: state.post.profile.contacts,
        current_user_id: state.header.user_id,
        logined: state.app.logined,
        processed: state.app.initialized,
        profile: state.post.profile,
        userId: state.header.user_id,
        userImage: state.header.image
    }
}

type stateType = {
    name: string
    description: string
    photo: any
    lookingForAJob: boolean
    lookingForAJobDescription: string
    contacts: any
    current_user_id: number | null
    logined: boolean | undefined
    processed: boolean
    userId: number | null
    userImage: any
    profile: any
}
type dispatchType = {
    setProfile: Function
    getStatus: Function
    addImage: Function
    changeProfile: Function
    updateStatus: Function
}

const ProfileC = withRouter(connect<stateType, dispatchType, {}, GlobalType>
(state, {
    setProfile, getStatus, addImage,
    changeProfile, updateStatus
})(Profile))

export default ProfileC

