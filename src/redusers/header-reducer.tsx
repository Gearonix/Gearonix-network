import {http_codes, login_api, logout_api, setProfileId_api} from '../API';
import {stopSubmit} from 'redux-form';
import {headerType} from "../types";
import {GlobalType} from "../redux-store";
import {ThunkAction} from "redux-thunk";
import {AxiosResponse} from "axios";
import {ProfileDataT} from './post_reducer';

let init: headerType = {
    user_id: null,
    email: null,
    login: null,
    image: null
}
type ActionTypes = clearProfile_at | getUserId_at | onProfile_at |
    logined_at | onProfile_at | setProfileAT;


type ThunkType = ThunkAction<Promise<AxiosResponse<any> | any>, GlobalType, unknown, ActionTypes>

const header_reducer = function (state = init, action: any): headerType {
    switch (action.type) {
        case 'SET-USER-DATA':
            return {
                ...state, user_id: action.data.id, login: action.data.login
                , email: action.data.email
            }
        case 'SET-PROCESS':
            return {...state,}
        case 'STATE-HEADER':
            return {...state, login: action.data.fullName, image: action.data.photos.large}
        case 'CLEAR-PROFILE':
            return init
        case 'GET-USER-ID':
            return {...state, user_id: action.id}
        default:
            return state
    }
}
const CLEAR_PROFILE = 'CLEAR-PROFILE';

type clearProfile_at = {
    type: typeof CLEAR_PROFILE
}
export let clearProfile_ac = function (): clearProfile_at {
    return {
        type: 'CLEAR-PROFILE'
    }
}
type getUserId_at = {
    type: 'GET-USER-ID',
    id: number
}
export let getUserId = function (id: number): getUserId_at {
    return {
        type: 'GET-USER-ID',
        id: id
    }

}
const ON_PROFILE = 'ON-PROFILE';
type onProfile_at = {
    type: typeof ON_PROFILE
}
export let onProfile_ac = function (): onProfile_at {
    return {
        type: 'ON-PROFILE'
    }
}
type logined_at = {
    type: 'LOGINED-APP',
    log: boolean
}
export let logined_ac = function (log: boolean): logined_at {
    return {
        type: 'LOGINED-APP',
        log: log
    }
}


export let logout_tc = function (): ThunkType {
    return async function (dispatch) {
        await logout_api()
        dispatch(logined_ac(false))
        dispatch(clearProfile_ac())
    }
}

type setProfileAT = {
    type: 'SET-PROFILE',
    data: ProfileDataT
}

export let setProfile_ac = function (data: ProfileDataT): setProfileAT {
    return {
        type: 'SET-PROFILE',
        data: data
    }
}


export let login_tc = function (data: { email: string,password: string, rememberMe ?: boolean | undefined}): ThunkType {
    if (!data.rememberMe) {
        data.rememberMe = false
    }
    return async function (dispatch) {
        let response = await login_api(data)
        if (response.data.resultCode > http_codes.success) {
            let error = stopSubmit('login_form', {_error: 'Invalid password or email'});
            dispatch(error)
            return
        }
        dispatch(getUserId(response.data.data.userId))
        dispatch(logined_ac(true))
        let id = response.data.data.userId
        if (!id) {
            return
        }
        let next_response = await setProfileId_api(id)
        dispatch(setProfile_ac(next_response.data))
    }
}

export default header_reducer


