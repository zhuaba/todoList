import { createStore } from 'redux'
import todoList from './reducers/reducer'

const store=createStore(todoList);
export default store