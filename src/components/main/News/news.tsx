import React, {useEffect} from "react";

import NewsItem from './news_item/news_item'
import classes from './news.module.css';
import Preloader from "./../../others/preloader";
import {connect, useDispatch, useSelector} from "react-redux";
import {find_tc, showmore_tc} from "../../../redusers/news_reducer";
import {GlobalType} from "../../../redux-store";


type Props = {
    list : Array<any>
    size : number
    page : number
    preloader : boolean
    find : Function
    showmore : Function,
}


const News : React.FC<Props> = function(){
    const dispatch = useDispatch();



    const props : Props = {
        find : function(){ dispatch(find_tc(this.size))},
        size : useSelector((state: GlobalType) => state.news.size),
        list : useSelector((state : GlobalType) => state.news.list),
        page : useSelector((state : GlobalType) => state.news.page),
        preloader : useSelector((state : GlobalType) => state.news.preloader),
        showmore : function(){ dispatch(showmore_tc(this.size, this.page))}
    }

    function mount() {
        props.find(props.size)
    }
    useEffect(mount,[])

    let elements = props.list.map((item, index) => <NewsItem
        title={item.title} image={item.imageUrl} description={item.summary}
        newsSite={item.newsSite} publishedAt={item.publishedAt} key={index}/>)
    return (
        props.preloader ? <Preloader/> : <div className={classes.main}>
            <h2 className={classes.title}>News</h2>
            {elements}
            <button className={classes.showMore} onClick={() => {
                props.showmore(props.size, props.page)
            }}>Show more
            </button>
        </div>

    )
}
export default News;