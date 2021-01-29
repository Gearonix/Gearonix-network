import axios from 'axios';
import {reset} from "redux-form";
import {setMessagesAC as setMessages} from "./redusers/messages_reducer";
//'C:/Users/Егор/Desktop/Егор/html проэкты/html projects//src/api/API.js';
const base = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '8871fee4-a338-4c83-bb96-46a0d73488e2'
    },
    withCredentials: true
})
const news = axios.create({
    baseURL: 'https://www.spaceflightnewsapi.net/api/'
})

// base.interceptors.request.eject(() => //.)


export enum http_codes {
    success = 0,
    error = 10
}


type getUserType = {
    resultCode: http_codes.success
    messages: Array<string>
    data: {
        id: number,
        email: string,
        login: string
    }
}


export let testAPI = {
    getUser_API() {
        let test;
        try {
            test = base.get<getUserType>(`auth/me`)
        } catch (error) {
            console.log('ERROR')
            test = base.get<getUserType>(`auth/me`)
        }
        return test
    }
}

export function setProfileData_api(id: number) {
    return base.get(`profile/${id}`)
}

export function Usersapi_api(page_count: number | null) {
    return base.get(`users?count=${page_count}`)
}

export function showmore_api(page_count: number, page: number) {
    return base.get(`users?count=${page_count}&page=${page}`)
}

export function getPagesAPI(page_count: number, page: number) {
    return base.get(`users?count=${page_count}&page=${page}`)
}

export function setProfileId_api(id: number) {
    console.warn('PLEASE USE NEW PROFILE METHOD')
    return ProfileAPI.setProfileId_api(id)
}

export function unfollow_api(id: number) {
    return base.delete(`follow/${id}`)
}

export function followAPI(id: number) {
    return base.post(`follow/${id}`, {})
}

type changeProfileType = {
    LookingForAJobDescription: "___"
    aboutMe: "_"
    contacts: {
        facebook: null
        github: null
        instagram: null
        mainLink: null
        twitter: null
        vk: null
        website: null
        youtube: null
    }
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: "___"
    photos: { small: string, large: string }
    userId: null
}


export const ProfileAPI = {
    setProfileId_api(id: number) {
        return base.get(`profile/${id}`)
    },
    getStatus_api(id: number) {
        return base.get(`profile/status/${id}`)
    },
    setStatus_api(status: string) {
        return base.put('/profile/status', {status: status})
    },
    setImage(file: any) {
        let some_file = new FormData()
        some_file.append('image', file)
        return base.put('/profile/photo', some_file)
    },
    change_profile(data: changeProfileType) {
        let request;
        try {
            request = base.put('/profile', data)
        } catch (error) {
            console.log('ERROR')
            request = base.get(`auth/me`)

        }
        return request
    }
}

type loginApiDataType = {
    email: string
    password: string
    rememberMe?: boolean | undefined
}

export function login_api(data: loginApiDataType) {
    return base.post('/auth/login', data)
}

export function logout_api() {
    return base.delete('/auth/login')
}

export const NewsAPI = {
    find_api(count: number) {
        return news.get(`v2/blogs?_limit=${count}`)
    },
    showmore_api(count: number, page: number) {
        return news.get(`v2/blogs?_limit=${count}&_start=${page}`)

    }
}
export const UsersAPI = {
    searchUsers_api(value: string) {
        return base.get(`/users?term=${value}`)
    }
}
export let FriendsAPI = {
    getFriends_api(size: number) {
        return base.get(`/users?friend=true&count=${size}&page=1`)
    },
    showmoreFriends_api(page: number, size: number) {
        return base.get(`/users?friend=true&count=${size}&page=${page}`)
    },
    searchUsers_api(value: string) {
        return base.get(`/users?term=${value}&friend=true`)
    }
}

let ws: null | WebSocket;


let listeners : any[] = []

export function clean() {
    ws?.removeEventListener('close', onclose)
    ws?.removeEventListener('open', onopen)
    ws?.close()
}
export function onmessage(event : any){
    listeners.forEach((callback) => callback(JSON.parse(event.data)))
}
export function start() {
    clean()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    ws.addEventListener('close', onclose)
    ws.addEventListener('open', onopen)
    ws.addEventListener('message',onmessage)
}

export function onopen() {
    console.log('WEBSOCKET OPEN')
}

export function onclose(){
    console.log('WEBSOCKET ERROR : WEBSOCKET CLOSED')
    setTimeout(start, 4000)
}

export function subscribe(callback : Function){
    listeners.push(callback)
}


export function unsubscribe(callback : Function){
    listeners.filter((item : Function) => item!=callback)
}
export function send(value: string) {
    ws?.send(value)
}
