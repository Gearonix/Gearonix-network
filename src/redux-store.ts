import {combineReducers,createStore, applyMiddleware} from 'redux';
import post_reducer from './redusers/post_reducer';
import message_reducer from './redusers/messages_reducer';
import users_reducer from './redusers/users_reducer';
import header_reducer from './redusers/header-reducer';
import {reducer as form} from 'redux-form';
import thunk from 'redux-thunk';
import app_reducer from './redusers/app_reducer'
import news_reducer from "./redusers/news_reducer";
import friends_reducer from './redusers/friends_reducer';

let reducers=combineReducers({
	 post : post_reducer,
	 messages : message_reducer,
	 users : users_reducer,
	 header : header_reducer,
	 form : form,
	 app : app_reducer,
	news : news_reducer,
	friends : friends_reducer,
})
type GLOBAL_TYPE = typeof reducers;

export type GlobalType = ReturnType<GLOBAL_TYPE>

type PropertiesTypes<T> = T extends {[key : string] : infer U} ? U : never;

export type ActionProperty<T extends {[key : string] : (...args : any[]) => any}> = ReturnType<PropertiesTypes<T>>



let store = createStore(reducers,applyMiddleware(thunk));
export default store;