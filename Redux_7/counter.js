// REDUCER
function counterReducer(state, action) {
    if (typeof state === 'undefined') {
        return {count: 0}
    }

    var nextState = {
        count: state.count
    }

    switch (action.type) {
        case 'ADD':
            nextState.count = state.count + 1;
            return nextState;
            break;
        case 'MINUS':
            nextState.count = state.count - 1;
            return nextState;
            break;
        case 'RESET':
            nextState.count = state.count = 0;
            return nextState;
            break;
        default:
            return state
    }
}

function todosReducer(state, action) {
    if (typeof state === 'undefined') {
        return {todos: []}
    }

    // clone an object.  Arrays are objects and copy by ref.
    var nextState = Object.assign({}, state);

    switch (action.type) {
        case "NEW":
            nextState.todos.push(action.payload);
            return nextState
            break;
        case 'DELETE':
            nextState.todos.pop();
            return nextState
            break;
        case 'DELETE_ALL':
            nextState.todos = []
            return nextState
            break;
        default:
            return state
    }
}

// STORE
var state = {
    count: 0
}

// var store = Redux.createStore(counterReducer, state);
var store = Redux.createStore(Redux.combineReducers({todosReducer: todosReducer, counterReducer: counterReducer}));
var counterEl = document.getElementById('counter');
var todoInput = document.getElementById('todos');
var todoList = document.getElementById('todoList');

function render() {
    var state = store.getState();
    counterEl.innerHTML = state.counterReducer.count.toString();
    renderList(state);
}

function renderList(state) {
    todoList.innerHTML = '';
    for (var i=0; i < state.todosReducer.todos.length; i++) {
        var element = state.todosReducer.todos[i];
        var li = document.createElement('li');
        var todos = state.todosReducer.todos[i];
        li.innerHTML = todos.toString();
        todoList.appendChild(li);
    }
}

store.subscribe(render);

render();

// ACTIONS
document
    .getElementById('add')
    .addEventListener('click', function () {
        store.dispatch({type: 'ADD'})
    });
document
    .getElementById('minus')
    .addEventListener('click', function () {
        store.dispatch({type: 'MINUS'})
    });
document
    .getElementById('reset')
    .addEventListener('click', function () {
        store.dispatch({type: 'RESET'})
    });

// todos

document
    .getElementById('new')
    .addEventListener('click', function () {
        store.dispatch({type: 'NEW', payload:todoInput.value})
    })

document
    .getElementById('delete')
    .addEventListener('click', function () {
        store.dispatch({type: 'DELETE'})
    })

document
    .getElementById('delete_all')
    .addEventListener('click', function () {
        store.dispatch({type: 'DELETE_ALL'})
    })

