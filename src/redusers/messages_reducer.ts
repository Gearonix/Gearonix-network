import {messagesType} from "../types";
import data from "../data";
import {ThunkAction} from "redux-thunk";
import {AxiosResponse} from "axios";
import {GlobalType} from "../redux-store";
import {send, subscribe, start, onclose, onmessage, clean, unsubscribe} from "../API";
import {Dispatch} from "redux";

let initial: messagesType = {
    messages : []
}
type ActionTypes = setMessagesAT

type ThunkType = ThunkAction<Promise<any>, GlobalType, unknown, ActionTypes>



const message_reducer = function (state = initial, action: setMessagesAT): messagesType {
    switch (action.type) {
        case 'SET-MESSAGES':
            return {...state,messages : [...state.messages,...action.data]}
        default :
            return state
    }
}

type setMessagesAT = {
    type : 'SET-MESSAGES',
    data : any
}

export let setMessagesAC = (data : any) : setMessagesAT => {
    return{
        type : 'SET-MESSAGES',
        data : data
    }
}

const subscribeCallbackC = function(dispatch : Dispatch) : ThunkType{
    return async function(data : any){
        dispatch(setMessagesAC(data))
    }
}

export let subscribeTC = function () : ThunkType{
    return async function(dispatch){
        start()
        subscribe(subscribeCallbackC(dispatch))
    }
}
export let unsubscribeTC = function() : ThunkType{
    return async function(dispatch){
        unsubscribe(subscribeCallbackC(dispatch))
        onclose()
    }
}

export let sendMessageTC = function(value : string) : ThunkType{
    return async function(){
        send(value)
    }
}


export default message_reducer;