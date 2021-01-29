import classes from './news_item.module.css';
import React from "react";

type Props = {
    title : string
    image : string
    description : string
    newsSite : string
    publishedAt : string
    key ?: number
}

const NewsItem : React.FC<Props>= function (props) {
    let pub = props.publishedAt.slice(0, 10).split('-').join(' ')
    return (
        <div className={classes.main}>

            <div className={classes.mainBlock}>
                <div className={classes.titleFlex}>
                    <h2 className={classes.title}>{props.title.length >= 84 ? `${props.title.slice(0, 84)}...` : props.title}</h2>
                    <div className={classes.publishedBlock}><h4 className={classes.published}>{pub}</h4></div>

                </div>
                <div className={classes.descriptionBlock}>
                    <p className={classes.description}>{props.description}</p></div>
            </div>
            <div className={classes.imageBlock}>
                <img src={props.image} className={classes.image} alt={''}/>
            </div>
        </div>
    )
}
// title={item.title} image={item.imageUrl} description={item.summary}
// newsSite={item.newsSite} publishedAt={item.publishedAt} key={index}/>)

export default NewsItem