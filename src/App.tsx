import './App.css';
import  React,{useEffect} from 'react';
import './source/normalize.css';
import Header from './components/header/header';
import Aside from './components/aside/aside';
import Main from './components/main/main';
import {withRouter} from 'react-router-dom';
import {initialize_tc as initialize} from './redusers/app_reducer'
import {connect} from 'react-redux';
import {compose} from 'redux';
import {GlobalType} from "./redux-store";

type Props = {
    initial : boolean
    initialize : Function
}

const App : React.FC<Props> = function(props){
  function mount(){
      props.initialize()
  }
  useEffect(mount,[])
  let app = <div className="App">
       <Header />
       <div className={'container'}>
       <Aside />
       <Main />
       </div>
         </div>
  let preloader = <div className="App">
       <Header />
       <Aside />
         </div>
    // debugger
  return(
  props.initial ? app : preloader
  )
}


let mapStateToProps = function(state : GlobalType){
  return{
    initial : state.app.initialized
  }
}

type stateType = {
    initial : boolean
}

type dispatchType = {
    initialize : Function
}

export default compose(withRouter,connect<stateType,dispatchType,{},GlobalType>(mapStateToProps,{initialize}))(App);