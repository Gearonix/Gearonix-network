//import data from 'C:/Users/Егор/Desktop/Егор/html проэкты/html projects//src/data.jsx'
// import {render} from './render.jsx';
import post_reducer from './redusers/post_reducer.ts'
// import input_reducer from './redusers/input_reducer.jsx';
import message_reducer from './redusers/messages_reducer.ts';
let store={

	data : {
	post : [
	{message : "Hello,world!",likes : 3, key : 0,liked : false,styled : 'likes'},
	{message : "First React message.",likes : 4, key: 1,liked : false,styled : 'likes'},
	{message : "GO Apex!",likes : 4, key: 2,liked : false,styled : 'likes'}

	],
	dialogName1:[
	{message : 'Hello!',image : '1'},
	{message : 'React!',image : '2'}
	],
	dialogName2 : [
	{message : 'notHello!',image : '2'},
	{message : 'angular!',image : '3'}
	],
	messages : [{name : "Noname", adress: "1"},
	{name : "Friend" ,adress: "2"}
	],
	friends : [
	{friend : "user1",image : "1"},
	{friend : "user2",image : "2"},
	{friend : "user3",image : "3"}
	],
	PostTextArea : "",
	dialogName1TextArea : "",
	dialogName2TextArea : ""
},
	dispatch(action){
	this.data.post = post_reducer(this.data.post,action);
	// this.data.PostTextArea=input_reducer(this.data.PostTextArea,action);

	this.data=message_reducer(this.data,action);
	// this.data.dialogName1TextArea=input_reducer(this.data.dialogName1TextArea,action)
	// this.data.dialogName2TextArea=input_reducer(this.data.dialogName2TextArea,action)	
	// render()

},
actionCreater : {
		addPost_ac : function(){
			return {type : 'ADD-POST',typeText : store.data.PostTextArea}
		},
		changeInput_ac : function(value,directory){
			return {type: 'CHANGE-INPUT', value : value , directory : directory}
		},
		addPostLike_ac : function(index){
			return {type : 'ADD-POST-LIKE',index: index}
		},
		addDialog_ac : function(dialog,image){
			return {type : 'ADD-DIALOG',dialog : dialog, image : image}
		}
	}


}


// addPost_data(){
	
// },
// changeInput__data(value,directory){
// },
// addDialog_data(dialog,image="2"){
	
// },
// addPostLike_data(index){

// },
// }
// console.log(store.addDialog_data)


export default store;