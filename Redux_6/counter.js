/**
 * 
 * createStore()
 * getState()
 * dispatch()
 * subscribe()
 */

// REDUCER
function counter(state, action) {
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
            nextState.count = state.count - 1 ;
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

// STORE
var state = {
    count: 0
}

var store = Redux.createStore(counter, state);
var counterEl = document.getElementById('counter');

function render() {
    var state = store.getState();
    counterEl.innerHTML = state
        .count
        .toString();
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