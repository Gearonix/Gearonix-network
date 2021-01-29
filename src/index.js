import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './source/reportWebVitals';
import {Provider} from 'react-redux';
import store from './redux-store.ts';
import {BrowserRouter, HashRouter} from 'react-router-dom'
let render=function(){

	ReactDOM.render(

   <Provider store={store}>
   <BrowserRouter>
   <App />
   </BrowserRouter>
   </Provider>, document.getElementById('root')
)};

console.warn = function (){
    //code...
}

render()

window.addEventListener('unhandledrejection',() => {})


reportWebVitals();
