import {NewsAPI} from '../API';
import {newsType} from "../types";
import {GlobalType} from "../redux-store";
import {ThunkAction} from "redux-thunk";
import {AxiosResponse} from "axios";


const initial: newsType = {
    list: [],
    size: 4,
    page: 2,
    preloader: true
}

type ActionTypes = find_cityAT | showmoreAT | error_AT;


type ThunkType = ThunkAction<Promise<any> | Promise<AxiosResponse<any>>,GlobalType,unknown,ActionTypes>

const news_reducer = function (state = initial, action: ActionTypes): newsType {
    switch (action.type) {
        case 'FIND-CITY':
            return {...state, list: [...state.list, ...action.data], preloader: false}
        case 'SHOW-MORE-NEWS':
            return {...state, list: [...state.list, ...action.data], page: state.page + 1}
        default:
            return state
    }
}
type find_cityAT = {
    type: 'FIND-CITY',
    data: Array<any>
}

export let setNewsAC = function (data: Array<any>): find_cityAT {
    return {
        type: 'FIND-CITY',
        data: data
    }
}
const ERROR = 'ERROR'

type error_AT = {
    type : typeof ERROR
}


export let find_tc = function (size: number) : ThunkType{
    return async function (dispatch) {
        let response = await NewsAPI.find_api(size)
        dispatch(setNewsAC(response.data))
    }
}
type showmoreAT = {
    type: 'SHOW-MORE-NEWS',
    data: Array<any>
}
export let showmore_ac = function (data: Array<any>): showmoreAT {
    return {
        type: 'SHOW-MORE-NEWS',
        data: data
    }
}

export let showmore_tc = function (count: number, page: number) : ThunkType {
    return async function (dispatch) {
        let response = await NewsAPI.showmore_api(count, page)
        dispatch(showmore_ac(response.data))
    }
}

export default news_reducer