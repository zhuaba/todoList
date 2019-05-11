
const initState = {
    todos:[],
    filter:"all",   //all,complete,active
}

function createGenId(){
    let id = 0;
    return function(){
        return id++;
    }
}


const genID=createGenId();

function todoList(state=initState,action){
    switch(action.type){
        case "add":
            {
                const todos=[...state.todos,{
                    id:genID(),
                    title:action.title,
                    complete:false
                }]
                const newState=Object.assign({},state,{todos:todos})
                return newState;
            }
        case 'update':    //点击li变更complete出现了问题，待调试；
            {
                const newtodos=[];
                const newtodo=action.value;
                for(let i in state.todos){
                    var current=state.todos[i]
                    if(current.id === newtodo.id){
                        newtodos.push(newtodo)
                    }else{
                        newtodos.push(current)
                    }
                }
                const newState=Object.assign({},state,{todos:newtodos})
                return newState;
            }
        case 'showway':
            {
                const newState=Object.assign({},state,{filter:action.filter})
                return newState;
            }
        default:
            return state;
    }

}

export default todoList