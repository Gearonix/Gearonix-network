import classes from './users.module.css';
import NewUser from './NewUser/NewUserContainer';
import React, {useEffect} from 'react'
import Preloader from './../../others/preloader.jsx';
import {connect, useDispatch, useSelector} from 'react-redux';
import users_s from './../../../selectors/users_selectors';
import {
    getUsersTC as setUsers,
    showMoreTC as showmore,
    getPageTC as setAjax,
    nextAC as next,
    previos_ac as prev,
    searchUsers_tc as searchUsers,
    cancelSearchTC as cancelSearch,
} from '../../../redusers/users_reducer';
// import {Field, reduxForm} from "redux-form";
import {required} from './../../../utils/validators/validaor'
import {SearchInput} from './../../others/validate_textarea/validate_textarea'
import {GlobalType} from '../../../redux-store';
import {Field, Form, Formik, useFormik} from 'formik';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import query from 'query-string'

type Props = {
    TotalCount: number,
    page: number,
    users: Array<any>,
    preloader: boolean,
    pageCount: number,
    currentPage: number,
    paginator: number,
    showmore_hidden: any,
    followError: any,
    showmore: Function,
    setAjax: Function,
    setUsers: Function,
    next: any,
    prev: any,
    searchUsers: Function,
    cancelSearch: () => void,
    filter : string | null
}

// let state_mtp = function (state: GlobalType) {
//     return {
//         TotalCount: state.users.size,
//         page: state.users.page,
//         users: state.users.list,
//         preloader: state.users.preloader,
//         pageCount: state.users.pageCount,
//         currentPage: state.users.currentPage,
//         paginator: users_s.paginator(state),
//         showmore_hidden: state.users.showmore,
//         followError: state.users.followError,
//         showmore, setAjax,
//         setUsers, next, prev, searchUsers, cancelSearch
//     }
// }
const Users: React.FC<Props> = function () {
    const dispatch = useDispatch()

    let props : Props = {
        TotalCount : useSelector((state: GlobalType) => state.users.size),
        page : useSelector((state: GlobalType) => state.users.page),
        users : useSelector((state: GlobalType) => state.users.list),
        preloader : useSelector((state: GlobalType) => state.users.preloader),
        pageCount : useSelector((state: GlobalType) => state.users.pageCount),
        currentPage : useSelector((state: GlobalType) => state.users.currentPage),
        paginator : useSelector((state: GlobalType) => state.users.paginator),
        showmore_hidden : useSelector((state: GlobalType) => state.users.showmore),
        followError : useSelector((state: GlobalType) => state.users.followError),
        showmore : (count : number,page : number) => dispatch(showmore(count,page)),
        setAjax : (count : number,page : number) => dispatch(setAjax(count,page)),
        setUsers : (count : number) => dispatch(setUsers(count)),
        next : () => dispatch(next()),
        prev : () => dispatch(prev()),
        searchUsers : (value : string) => dispatch(searchUsers(value)),
        cancelSearch : () => dispatch(cancelSearch()),
        filter : useSelector((state : GlobalType) => state.users.filter)

    }

    let mount = () => {
        const parsed = query.parse(history.location.search);
        if (parsed.term){
            props.searchUsers(parsed.term)
        }
        if (parsed.page){
            props.setAjax(props.pageCount,parsed.page)
        }
            // setAjax
        if (props.users.length == 0) {
            props.setUsers(props.pageCount)
        }
    }
    const filter = useSelector((state : GlobalType) => state.users.filter);

    console.log(filter)
    const history = useHistory();

    useEffect(() => {
        if (filter){
            history.push({
                pathname: '/users',
                search : `?term=${filter}`
            })
        }
        console.log('CHANGE')

    },[filter,props.currentPage])

    useEffect(mount, [])




    let elements = props.users.map((item : any)=> <NewUser
        key={item.id} name={item.name} description={item.status}
        location={item.location} followed={item.followed} id={item.id} user_image={item.photos.large}
        followError={props.followError} friend={false}/>)
    let pages = []

    let count = 5
    if (props.paginator > 100) {
        count = 4
    } else if (props.paginator < 10) {
        count = 7
    }

    for (let i = props.paginator; i <= count + props.paginator - 1; i++) {
        pages.push({title: i, selected: i === props.currentPage ? true : false})
    }
    // debugger

    const getPage = (count : number,page : number) => {
        // page
        history.push({
        pathname : '/users',
        search : `?page=${page}`
        })
        props.setAjax(count,page);
    }

    let navbar = pages.map((item, index) => <span onClick={() => getPage(props.pageCount, item.title)}
                                                  className={item.selected ? classes.selected : classes.nav_item}
                                                  key={index}>{item.title}</span>)


    let no_users = props.users.length === 0 && <span>no users</span>
    // dispatch(setFriends_tc(size))
    // dispatch(cancelSearch_ac())

    return (<div className={classes.main}>
            <h1 className={classes.title}>Users</h1>
            {/*// @ts-ignore*/}
            <Search search={props.searchUsers} show={props.showmore_hidden} cancel={props.cancelSearch} valueOFF={props.filter}/>
            <div className={!props.preloader && props.showmore_hidden ? classes.navbar_wrapper : classes.hidden}>
            {props.paginator > 2 ?
                <span onClick={props.prev} className={classes.arrow + " " + classes.left}>&#9668;</span> : null}
            {navbar}
            <span onClick={props.next} className={classes.arrow + " " + classes.right}>&#9658;</span>
            </div>
            {!props.preloader ?
            <>

            <div className={props.preloader ? classes.preloader : classes.hidden}></div>
            {elements}
            {no_users}
            {props.showmore_hidden && <button onClick={() => props.showmore(props.pageCount, props.page)}
                                              className={!props.preloader ? classes.showmore : classes.hidden}>Show
                more</button>}
                </> : <Preloader />}
        </div>
    )
}


// <Search search={props.searchUsers} cancel={props.cancelSearch} show={props.showmore_hidden}/>
type SearchProps = {
    search: Function,
    cancel: () => void
    show: boolean
}

export const Search: React.FC<SearchProps> = function (props) {
    function search(value : string) {
        // debugger
        props.search(value)
    }

    return (
        // @ts-ignore
        // <SearchFormContainer onSubmit={search} cancel={props.cancel} show={props.show}/>
        <SeacrhForm submit={search} show={props.show} cancel={props.cancel} valueOFF={props.value}/>
    )
}
const SeacrhForm = (props : any) => {
    const formik = useFormik({
        initialValues : {value : ''},
        onSubmit : (values, {resetForm}) => {
            // debugger
            props.submit(values.value)
            console.log('submit')
            resetForm()
        },
    })
    let reset = function(){
        formik.resetForm()
        props.cancel()
    }
    return(
    <div>
        <form onSubmit={formik.handleSubmit}>
            <div className={classes.searchInputBlock}>
                <button className={classes.searchIcon}></button>
                <input type={'text'} name={'value'} placeholder={'Search user'}
                       className={classes.searchInput}
                       autoComplete="off" onChange={formik.handleChange}/>
                {!props.show && <button onClick={reset} className={classes.cancel}></button>}
            </div>
        </form>
    </div>
    )
}

const SeacrhForm_DISABLED = function (props: any) {
    function cancel(event: any) {
        props.cancel()
        event.preventDefault()
    }

    return (
        <form onSubmit={props.handleSubmit}>
            <div className={classes.searchInputBlock}>
                <button className={classes.searchIcon}></button>
                <Field type={'text'} component={SearchInput} name={'search'} placeholder={'Search user'}
                       validate={required} className={classes.searchInput}
                       autoComplete="off"/>
                {!props.show && <button onClick={cancel} className={classes.cancel}></button>}
            </div>

        </form>

    )
}


// const SearchFormContainer = reduxForm({form: 'search_users'})(SeacrhForm)
export default Users
//
// let state_mtp = function (state: GlobalType) {
//     return {
//         TotalCount: users_s.getTotalCount(state),
//         page: users_s.getPage(state),
//         users: users_s.getUsers(state),
//         preloader: users_s.getPreloader(state),
//         pageCount: users_s.getPageCount(state),
//         currentPage: users_s.getCurrentPage(state),
//         users_hidden: users_s.getUsersHidden(state),
//         paginator: users_s.paginator(state),
//         showmore_hidden: state.users.showmore,
//         followError: state.users.followError,
//
//     }
// }
// type dispatchType = {
//     showmore: Function,
//     setAjax: Function,
//     setUsers: Function,
//     next: Function,
//     prev: Function,
//     searchUsers: Function,
//     cancelSearch: () => void,
// }
//
// type stateType = {
//     TotalCount: number,
//     page: number,
//     users: Array<any>,
//     preloader: boolean,
//     pageCount: number,
//     currentPage: number,
//     users_hidden: boolean,
//     paginator: number,
//     showmore_hidden: any,
//     followError: any,
// }
// export default connect<stateType, dispatchType, {}, GlobalType>
// (state_mtp, {
//     showmore, setAjax,
//     setUsers, next, prev, searchUsers, cancelSearch
// })(Users)
//
