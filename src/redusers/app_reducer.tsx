import {http_codes, ProfileAPI, testAPI} from '../API';
import {appType} from "../types";
import { GlobalType} from "../redux-store";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AxiosResponse} from 'axios';

let initial: appType = {
    initialized: false,
    logined: undefined,
    error: false
}



type DispatchT = Dispatch

type ActionTypes= set_user_dataAT | setStatusAT | loginedAT | set_initialAT;

type ThunkType = ThunkAction<Promise<void> | Promise<AxiosResponse<any>>, GlobalType, unknown, ActionTypes>

const app_reducer = function (state = initial, action: ActionTypes): appType {
    switch (action.type) {
        case 'SET-INITIAL':
            return {...state, initialized: true}
        case 'LOGINED-APP':
            return {...state, logined: action.log}
        default:
            return state
    }
}

type set_initialAT = {
    type : 'SET-INITIAL'
}

const set_initial_ac = function () : set_initialAT{
    return {
        type: 'SET-INITIAL'
    }
}
type loginedAT = {
    type : 'LOGINED-APP',
    log : boolean
}

const loginedAC = function (log: boolean) : loginedAT {
    return {
        type: 'LOGINED-APP',
        log : log
    }
}
type setStatusAT = {
    type : 'SET-STATUS',
    status : string
}
const setStatus_ac = function (status: string): setStatusAT{
    return {
        type: 'SET-STATUS',
        status: status
    }
}

type set_user_dataAT = {
    type : 'SET-USER-DATA',
    data : { email: string
        id: number
        login: string
    }
}
const set_user_data_ac = function (data: { email: string
    id: number
    login: string}) : set_user_dataAT {
    return {
        type: 'SET-USER-DATA',
        data: data
    }
}


export let initialize_tc = function (): ThunkType {
    return async function (dispatch) {
        await dispatch(getUser_tc());
        dispatch(set_initial_ac())
    }
}

export let getUser_tc = function (): ThunkType {
    return async function (dispatch) {
        let response = await testAPI.getUser_API()
        if (response.data.resultCode > http_codes.success) {
            console.log('You are not registred')
            dispatch(loginedAC(false))
            return response
        }
        dispatch(set_user_data_ac(response.data.data))
        dispatch(loginedAC(true))
        return response
    }
}


export let getStatus_tc = function (id: number) {
    return async function (dispatch: DispatchT) {
        debugger
        if (!id) {
            return
        }
        let response = await ProfileAPI.getStatus_api(id)
        dispatch(setStatus_ac(response.data))
    }
}



export default app_reducer