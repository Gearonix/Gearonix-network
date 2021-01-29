import {
    setProfileId_api,
    ProfileAPI
} from '../API';
import { stopSubmit} from "redux-form";
import {postType} from "../types";
import {GlobalType} from "../redux-store";
import {ThunkAction} from "redux-thunk";
import {AxiosPromise} from "axios";

let initial: postType = {
    posts: [{message: 'Hello, world!', id: 1, liked: false, likes: 4}],
    profile: {},
    user_id: null
}



const post_reducer = function (state = initial, action: ActionTypes): postType {
    switch (action.type) {
        case 'ADD-POST':
            return {
                ...state,
                posts: [{
                    message: action.data.textarea,
                    id: state.posts[0].id + 1,
                    likes: 0,
                    liked: false
                }, ...state.posts],
            }
        case 'GET-LIKE':
            return {
                ...state, posts: state.posts.map(item => {
                    if (action.index === item.id) {
                        return {...item, liked: !item.liked, likes: item.liked ? item.likes - 1 : item.likes + 1}
                    }
                    return item
                })
            }

        case 'SET-PROFILE':
            // debugger
            return {...state, profile: {...action.data, aboutMe: state.profile.aboutMe}}

        case 'SET-STATUS':
            return {...state, profile: {...state.profile, aboutMe: action.status}}

        case 'SET-IMAGE':
            return {...state, profile: {...state.profile, photos: action.photos}}
        case 'SET-NEW-PROFILE':

            return {...state, profile: action.data}
        case 'CLEAR-PROFILE-PARTICALLY':
            return {...state, user_id: null, profile: {}}
        default :
            return state;
    }

}
type ActionTypes =clearProfilePartiallyAT | addPostAT |
    getLikeAT | setProfileAT | setStatusAT | setImageAT | set_new_profileAT | setHeaderStateAT ;


type ThunkType = ThunkAction<Promise<AxiosPromise<any> | any>,
    GlobalType, unknown, ActionTypes>


type clearProfilePartiallyAT = {
    type: 'CLEAR-PROFILE-PARTICALLY'
}
export let clearProfilePartially_ac = function (): clearProfilePartiallyAT {
    return {
        type: 'CLEAR-PROFILE-PARTICALLY'
    }
}
type addPostAT = {
    type: 'ADD-POST',
    data: { textarea : string }
}
export let addPost_ac = function (data:  { textarea : string }): addPostAT {
    return {
        type: 'ADD-POST',
        data: data
    }
}
type getLikeAT = {
    type: 'GET-LIKE',
    index: number
}
export let getLike_ac = function (index: number): getLikeAT {
    return {
        type: 'GET-LIKE',
        index: index
    }
}
export type ProfileDataT = {
    aboutMe: string
    contacts: {
        facebook: null | string, website: null | string, vk: null | string, twitter: null | string, instagram: null | string,
        mainLink: null | string
        youtube: null | string}
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    photos: {small: string, large: string}
    userId: number
}
type setProfileAT = {
    type: 'SET-PROFILE',
    data: ProfileDataT
}


export let setProfile_ac = function (data: ProfileDataT): setProfileAT {
    // debugger
    return {
        type: 'SET-PROFILE',
        data: data
    }
}

type setHeaderStateAT = {
    type : 'STATE-HEADER',
    data : ProfileDataT
}

export let setHeaderState_ac = function (data: ProfileDataT) : setHeaderStateAT {
    return {
        type: 'STATE-HEADER',
        data: data
    }
}
export let setProfile_tc = function (id: number, current_id: number | null = null) : ThunkType {
    return async function (dispatch) {
        if (!id) {
            return
        }
        let response = await setProfileId_api(id)
        if (id == current_id) {
            dispatch(setHeaderState_ac(response.data))
        }
        dispatch(setProfile_ac(response.data))

    }
}


type setStatusAT = {
    type: 'SET-STATUS',
    status: string
}
export let setStatus_ac = function (status: string): setStatusAT {
    return {
        type: 'SET-STATUS',
        status: status
    }
}
export let getStatus_tc = function (id: number) : ThunkType {
    return async function (dispatch) {
        if (!id) {
            return
        }
        let response = await ProfileAPI.getStatus_api(id)
        dispatch(setStatus_ac(response.data))
    }
}

export let updateStatus_tc = function (status: string) : ThunkType{
    return async function (dispatch) {
       let response =  await ProfileAPI.setStatus_api(status)
        if (response.data.resultCode > 0) {
                let error = stopSubmit('login_form',{_error : 'Invalid password or email'});
                dispatch(error)
                return
            }
        dispatch(setStatus_ac(status))
    }
}
type setImageAT = {
    type: 'SET-IMAGE',
    photos:  { small : string,large : string }
}

export let setImage_ac = function (photos: { small : string,large : string }): setImageAT {
    // debugger
    return {
        type: 'SET-IMAGE',
        photos: photos
    }
}

export let addImage_tc = function (value: string) : ThunkType {
    return async function (dispatch) {
        let response = await ProfileAPI.setImage(value)
        dispatch(setImage_ac(response.data.data.photos))
    }
}

type set_new_profileAT = {
    type: 'SET-NEW-PROFILE',
    data: ProfileDataT
}
export let set_new_profile_ac = function (data: ProfileDataT): set_new_profileAT {
    return {
        type: 'SET-NEW-PROFILE',
        data: data
    }
}
type errorAT = {
    type: 'ERROR'
}

export let error_ac = function (): errorAT {
    return {
        type: 'ERROR'
    }
}


export let change_profile_tc = function (data: ProfileDataT, profile: ProfileDataT) : ThunkType {
    return async function (dispatch) {
        let obj : any= Object.assign(profile, data)
        console.log(obj)
        let response = await ProfileAPI.change_profile(obj)
        // debugger
        if (response.data.resultCode > 0) {
            let error = stopSubmit('profile_info_form', {_error: 'Invalid contacts.'});
            dispatch(error)
            return true
        }
        dispatch(set_new_profile_ac(data))
        dispatch(clearProfilePartially_ac())
        dispatch(setProfile_ac(obj))
}
}


export default post_reducer;
