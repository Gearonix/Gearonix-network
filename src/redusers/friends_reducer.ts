import {FriendsAPI} from '../API'
import {error_ac} from "./post_reducer";
import {friendsType} from "../types";
import {ThunkAction} from "redux-thunk";
import {AxiosResponse} from "axios";
import {GlobalType} from "../redux-store";


let initial: friendsType = {
    list: [],
    size: 4,
    page: 2,
    showmore: false,
    preloader: true,
}
type ThunkType = ThunkAction<Promise<void> | Promise<AxiosResponse<any>>, GlobalType, unknown, ActionTypes>

const friends_reducer = function (state = initial, action: ActionTypes): friendsType {
    switch (action.type) {
        case 'SET-FRIENDS':
            return {...state, list: action.friends, showmore: false}
        case 'friends/SHOW-MORE':
            return {...state, list: [...state.list, ...action.friends], page: state.page + 1, showmore: action.showmore}
        case 'friends/SEARCH':
            return {...state, list: action.friends, showmore: true}
        case 'friends/CANCEL-SEARCH':
            return {...state, showmore: false, page: state.page + 2}
        case 'friends/PREALODER':
            return {...state, preloader: action.preloader}
        case 'REMOVE-FRIEND':
            return {
                ...state, list: state.list.map(item => {
                    // debugger
                    if (item.id == action.id) {
                        return {del: true}
                    }

                    return item
                }).filter(item => item.id ? true : false)
            }
        default:
            return state
    }
}

type ActionTypes = setFriendsAT | removeFriendAT | showmoreAT  | cancelSearchAT |  searchAT  | prealoaderAT
type setFriendsAT = {
    type: 'SET-FRIENDS',
    friends: any
}
export let setFriends_ac = function (friends: any): setFriendsAT {
    return {
        type: 'SET-FRIENDS',
        friends: friends
    }
}
type removeFriendAT = {
    type: 'REMOVE-FRIEND',
    id: number
}
export let removeFriend_ac = function (id: number): removeFriendAT {
    return {
        type: 'REMOVE-FRIEND',
        id: id
    }
}
export let removeFriend_tc = function (id: number, page: number, size: number, list: Array<any>) : ThunkType {
    return async function (dispatch) {
        if (list.length == 1) {
            dispatch(preloader_ac(true))
            dispatch(showmore_tc(page, size))
            dispatch(preloader_ac(false))
        }
        dispatch(removeFriend_ac(id))
        // debugger
    }

}


export let setFriends_tc = function (size: number) : ThunkType {
    return async function (dispatch) {
        dispatch(preloader_ac(true))
        let response = await FriendsAPI.getFriends_api(size)
            dispatch(setFriends_ac(response.data.items))
            dispatch(preloader_ac(false))
    }
}
type showmoreAT = {
    type: 'friends/SHOW-MORE',
    friends: any,
    showmore: boolean
}
export let showmore_ac = function (friends: any, showmore = false): showmoreAT {
    return {
        type: 'friends/SHOW-MORE',
        friends: friends,
        showmore: showmore
    }
}
type prealoaderAT = {
    type: 'friends/PREALODER',
    preloader: boolean
}
export let preloader_ac = function (preloader: boolean): prealoaderAT {
    return {
        type: 'friends/PREALODER',
        preloader: preloader
    }
}


export let showmore_tc = function (page: number, size: number) : ThunkType{
    return async function (dispatch) {
        let response = await FriendsAPI.showmoreFriends_api(page, size)
        if ((page * size) >= response.data.totalCount) {
            dispatch(showmore_ac(response.data.items, true))
            return
        }
        dispatch(showmore_ac(response.data.items))
    }
}
type searchAT = {
    type: 'friends/SEARCH',
    friends: any
}
export let search_ac = function (friends: any): searchAT {
    return {
        type: 'friends/SEARCH',
        friends: friends
    }
}

export let search_tc = function (value: string) : ThunkType {
    return async function (dispatch) {
        dispatch(preloader_ac(true))
        let response =  await FriendsAPI.searchUsers_api(value)
        dispatch(search_ac(response.data.items))
        dispatch(preloader_ac(false))
    }
}
type cancelSearchAT = {
    type: 'friends/CANCEL-SEARCH'
}
export let cancelSearch_ac = function (): cancelSearchAT {
    return {
        type: 'friends/CANCEL-SEARCH'
    }
}

export let cancel_tc = function (size: number) : ThunkType{
    return async function (dispatch: any) {
        dispatch(setFriends_tc(size))
        dispatch(cancelSearch_ac())
    }
}


export default friends_reducer