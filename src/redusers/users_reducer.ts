import {Usersapi_api, showmore_api, getPagesAPI, followAPI, unfollow_api, UsersAPI} from '../API';
import {removeFriend_tc} from "./friends_reducer";
import {usersType} from "../types";
import {ThunkAction} from "redux-thunk";
import {AxiosPromise} from "axios";
import {GlobalType} from "../redux-store";

let initial: usersType = {
    list: [],
    preloader: true,
    page: 2,
    pageCount: 4,
    currentPage: 1,
    followLoading: false,
    paginator: 1,
    size: 4,
    loadingButton: null,
    showmore: true,
    followError: null,
    filter : null
}

type ActionTypes = followAT | setUsersAT | getPageAT | prealoderAT |
    getFollowLoadingAT | showMoreAT
    | folowErrorAT | searchUsersAT | nextAT | previosAT | unfollowAT;

type ThunkType = ThunkAction<Promise<AxiosPromise<any> | any>, GlobalType, unknown, ActionTypes>

const users_reducer = function (state = initial, action: any): usersType {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state, list: state.list.map(user => {
                    if (user.id === action.user_id) {
                        return {...user, followed: true}
                    }
                    return user;
                }), followLoading: false
            }
        case 'UNFOLLOW':
            return {
                ...state, list: state.list.map(item => {
                    if (item.id === action.user_id) {
                        return {...item, followed: false}
                    }
                    return item
                }), followLoading: false
            }
        case 'DATA_SET-USERS':
            // debugger
            return {
                ...state, list: action.users, preloader: false, showmore: true
            }
        case 'GET-PAGE':
            // debugger
            return {
                ...state, currentPage: action.page, list: action.users, preloader: false,
                page: action.page + 1, showmore: true
            }
        case 'PRELOADER':
            return {
                ...state, preloader: true
            }
        case 'GET-FOLLOW-LOADING':
            return {
                ...state, followLoading: true, loadingButton: action.id
            }
        case 'NEXT-USERS-PAGE':
            // debugger
            return {...state, paginator: state.paginator + 5}
        case 'PREVIOS-USERS-PAGE':
            if (state.paginator < 2) {
                return {...state}
            }
            return {...state, paginator: state.paginator - 5}
        case 'users/SHOW-MORE':
            // debugger
            //+1
            return {...state, list: [...state.list, ...action.users], page: state.page + 1}
        case 'SEARCH-USERS':
            return {...state, list: action.users, showmore: false, preloader: false,filter : action.term}
        // return state
        case 'CANCEL-SEARCH':
            return {...state, showmore: true, page: state.page + 2}
        case 'FOLLOW-ERROR':
            return {...state, followError: action.id}
        default:
            return state;
    }
}

type followAT = {
    type: 'FOLLOW',
    user_id: number
}
export let follow_ac = function (user_id: number): followAT {
    return {
        type: 'FOLLOW',
        user_id: user_id
    }
}
type unfollowAT = {
    type: 'UNFOLLOW',
    user_id: number
}
export let unfollow_ac = function (user_id: number): unfollowAT {
    return {
        type: 'UNFOLLOW',
        user_id: user_id
    }
}
type setUsersAT = {
    type: 'DATA_SET-USERS',
    users: Array<any>
}
export let setUsers_ac = function (users: Array<any>): setUsersAT {
    return {
        type: 'DATA_SET-USERS',
        users: users
    }
}
type getPageAT = {
    type: 'GET-PAGE',
    page: number,
    users: Array<any>
}
export let getPage_ac = function (page: number, users: Array<any>): getPageAT {
    return {
        type: 'GET-PAGE',
        page: page,
        users: users
    }
}
type prealoderAT = {
    type: 'PRELOADER'
}
export let preloader_ac = function (): prealoderAT {
    return {
        type: 'PRELOADER'
    }
}
type getFollowLoadingAT = {
    id: number,
    type: 'GET-FOLLOW-LOADING'
}

export let getFollowLoading_ac = function (id: number): getFollowLoadingAT {
    return {
        type: 'GET-FOLLOW-LOADING',
        id: id
    }
}
type showMoreAT = {
    type: 'users/SHOW-MORE',
    users: Array<any>
}
export let showMore_ac = function (users: Array<any>): showMoreAT {
    return {
        type: 'users/SHOW-MORE',
        users: users
    }
}

export let getUsersTC = function (pageCount: number | null = null): ThunkType {
    return async function (dispatch) {
        dispatch(preloader_ac())
        let response = await Usersapi_api(pageCount)
        dispatch(setUsers_ac(response.data.items))
    }
}
export let showMoreTC = function (pageCount: number, page: number): ThunkType {
    return async function (dispatch) {
        let response = await showmore_api(pageCount, page)
        dispatch(showMore_ac(response.data.items))
    }
}
export let getPageTC = function (pageCount: number, page: number): ThunkType {
    return async function (dispatch) {
        dispatch(preloader_ac())
        let response = await getPagesAPI(pageCount, page)
        dispatch(getPage_ac(page, response.data.items))
    }
}
type folowErrorAT = {
    type: 'FOLLOW-ERROR',
    id: number
}

export let followError_ac = function (id: number): folowErrorAT {
    return {
        type: 'FOLLOW-ERROR',
        id: id
    }
}

export let followTC = function (id: number): ThunkType {
    return async function (dispatch) {
        dispatch(getFollowLoading_ac(id))
        let response = await followAPI(id)
        if (response.data.resultCode > 0) {
            dispatch(followError_ac(id))
            return
        }
        dispatch(follow_ac(id))

    }
}


export let unfollowTC = function (
    id: number, page: number, size: number, list: Array<any>, isFriend: boolean): ThunkType {
    return async function (dispatch) {
        dispatch(getFollowLoading_ac(id))
        let response = await unfollow_api(id)
        if (response.data.resultCode > 0) {
            dispatch(followError_ac(id))
            return
        }
        dispatch(unfollow_ac(id))
        if (isFriend) {
            dispatch(removeFriend_tc(id, page, size, list))
        }
    }
}
type searchUsersAT = {
    type: 'SEARCH-USERS',
    users: Array<any>,
    term : string
}
export let searchUsersAC = function (users: Array<any>,value : string): searchUsersAT {
    return {
        type: 'SEARCH-USERS',
        users: users,
        term : value
    }
}
type nextAT = {
    type: 'NEXT-USERS-PAGE'
}
export let nextAC = function (): nextAT {

    return {
        type: 'NEXT-USERS-PAGE'
    }
}
type previosAT = {
    type: 'PREVIOS-USERS-PAGE'
}
export let previos_ac = function (): previosAT {
    return {
        type: 'PREVIOS-USERS-PAGE'
    }
}

export let searchUsers_tc = function (value: string): ThunkType {
    return async function (dispatch) {
        dispatch(preloader_ac())
        let response = await UsersAPI.searchUsers_api(value)
        dispatch(searchUsersAC(response.data.items,value))
    }
}

export let cancelSearchTC = function () {
    return function (dispatch: any) {
        dispatch(getUsersTC())
        dispatch(cancelSearchAT())
    }

}
export let cancelSearchAT = function () {
    return {
        type: 'CANCEL-SEARCH'
    }
}


export default users_reducer;


