import {GlobalType} from "./redux-store";

export type appType = {
        initialized : boolean,
        logined : boolean | undefined,
        error : boolean
}
export type friendsType= {
    list : Array<any>,
    size : number,
    page : number,
    showmore : boolean,
    preloader : boolean
}
export type headerType = {
    user_id : number | null,
    email : string | null,
    login : string | null,
    image : string | null
}

export type messagesType = {
    messages : Array<{message : string}>
}
export type newsType = {
    list : Array<any>,
    size : number,
    page : number,
    preloader : boolean
}
export type postType = {
    posts: Array<{message : string, id : number, liked : boolean, likes : number}>,
    profile: any,
    user_id: number | null,
}
export type usersType = {
    list :  Array<any>,
    preloader : boolean,
    page : number,
    pageCount : number,
    currentPage : number,
    followLoading : boolean,
    paginator : number,
    size : number,
    loadingButton : null | number,
    showmore : boolean,
    followError : any,
    filter : null | string
}
export type getState = () => GlobalType;

