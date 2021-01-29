import classes from './messages.module.css';
import React, {useEffect, useRef, useState} from 'react';
import {Field, reduxForm, reset} from 'redux-form'
import {useDispatch, useSelector} from "react-redux";
import {GlobalType} from "../../../redux-store";
import {setMessagesAC as setMessages, subscribeTC as subscribe,
    unsubscribeTC as unsubscribe,sendMessageTC as sendMessage
} from './../../../redusers/messages_reducer';
import {Redirect, NavLink} from "react-router-dom";


const Messages = function (props: any) {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field className={classes.area} placeholder="Write message..." maxLength="273" name='textarea'
                   component='textarea'/>
            <button className={classes.input}>Send</button>
        </form>

    )
}


const DialogName1FormContainer = reduxForm({
    form: 'dialogName1Form'
})(Messages)

type Props = {
    messages: Array<any>
    processed: boolean,
    logined: boolean | undefined,
}


const DialogName1: React.FC<Props> = function () {
    const dispatch = useDispatch();
    const [bottomButton, openBottomButton] = useState(false);
    const [redirect, openRedirect] = useState(false);
    let scroll = useRef(null as any);

    const state: Props = {
        messages: useSelector((state: GlobalType) => state.messages.messages),
        logined: useSelector((state: GlobalType) => state.app.logined),
        processed: useSelector((state: GlobalType) => state.app.initialized)
    }
    // @ts-ignore
    useEffect((mount),[])
    function mount(){
        checkAuth()
        scrollToBottom()
        dispatch(subscribe());
        openBottomButton(true)

        return () => dispatch(unsubscribe())
    }
    useEffect(scrollToBottom,[])
    const checkAuth = () => {
        if (state.logined == false && state.processed == true) {
            openRedirect(true)
        }
     }

    const addMessage = function ({textarea} : {textarea : string}) {
        if (!textarea) {
            return
        }
        dispatch(sendMessage(textarea))
        dispatch(reset('dialogName1Form'))
        scrollToBottom()
     }
    const CheckScroll = () => {
        let height = scroll.current.scrollHeight;
        let top = scroll.current.scrollTop;
        if (top <= height - 1300) {

            openBottomButton(true)
            return
        }
        openBottomButton(false)
    }
    function scrollToBottom () {
        scroll.current.scrollTo(0,scroll.current.scrollHeight)
    }
    if (redirect) {
        return <Redirect to={'/login'}/>
    }
    const elements = state.messages.map((item, index) => <CreateMessage
        message={item.message} key={index} image={item.photo} user_name={item.userName} user_id={item.userId}/>)
    return (
        // @ts-ignore
        <div className={classes.window}>
            <div className={classes.mainTest} ref={scroll} onScroll={CheckScroll}>

                {elements}
            </div>

            {bottomButton && <button onClick={scrollToBottom} className={classes.down}>&#8744;</button>}
            {/*@ts-ignore*/}
            <DialogName1FormContainer onSubmit={addMessage}/>
        </div>

    )
}


type CreateMessageProps = {
    image: string | null,
    message: string | null,
    user_name: string,
    user_id: number
}

const CreateMessage: React.FC<CreateMessageProps> = function (props) {
    return (
        <div className={classes.main}>
            <div className={classes.textBlock}>
                <span>{props.user_name}</span>
                <p className={classes.message}>{props.message}</p></div>
            <div className={classes.imageBlock}>
                {/*	@ts-ignore*/}
                <NavLink to={`/profile/${props.user_id}`}><img src={props.image} alt=""
                                                               className={classes.img}/></NavLink>
            </div>
        </div>
    )
}

export default DialogName1