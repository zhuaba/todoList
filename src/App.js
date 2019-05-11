import React from 'react'
import {connect} from 'react-redux'
import './App.css'

class App extends React.Component{
    state={task:''}
    handleClick=()=>{
        const {dispatch}=this.props
        console.log(this.state.task)
        const { task } = this.state;
        dispatch({type:'add',title:task})
        this.setState({
            task: ""
        });
    }
    handleChange=(e)=>{
        this.setState({
            task:e.target.value
        })
    }
    UpdateState(value){
        const {dispatch}=this.props
        const newValue=Object.assign({},value,{complete:!value.complete})
        dispatch({type:'update',value:newValue})
    }
    showWay(value){
        const {dispatch}=this.props
        dispatch({type:'showway',filter:value})

    }
    displayWay(){
        const {todos}=this.props
        if(this.props.filter==='all'){
            return todos
        }else if(this.props.filter==='complete'){
            return todos.filter((item)=>(item.complete===true))
        }else if(this.props.filter==='active'){
            return todos.filter((item)=>(item.complete===false))
        }

    }

    render(){
        const todos=this.displayWay()
        return(
            <div>
                <h1>Task List:</h1>
                <input value={this.state.task} onChange={this.handleChange}/>
                <button onClick={this.handleClick}>Add Task</button>
                <ul>
                    {todos.map((item)=>(
                        <li key={item.id} className={item.complete?'complete':''} onClick={this.UpdateState.bind(this,item)}>{item.title}</li>
                    ))}
                </ul>
                <div>
                    <button onClick={this.showWay.bind(this,'all')}>Show All</button>
                    <button onClick={this.showWay.bind(this,'complete')}>Has Completed</button>
                    <button onClick={this.showWay.bind(this,'active')}>Waiting to Do</button>
                </div>
            </div>
        )
    }
}

//export default App
export default connect((state)=>{
    console.log('state is ---->',state)
    return {
        todos:state.todos,
        filter:state.filter,
    }
},(dispatch)=>{
    console.log('dispatch',dispatch)
    return {
        dispatch:dispatch
    }
})(App)