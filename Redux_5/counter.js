// REDUCER
function counter(currentState, action) {

    var nextState = {
        count: currentState.count
    };

    switch (action.type) {
        case 'ADD':
            console.log('action: ', action);
            nextState.count = currentState.count + 1;
            return nextState
            break;
        case 'MINUS':
            console.log('action: ', action);
            nextState.count = currentState.count - 1;
            return nextState
            break;
        case 'RESET':
            console.log('action: ', action);
            nextState.count = 0;
            return nextState
            break;
        default:
            console.log('in default');
            return currentState
    }

}

var state = {
    count: 0
};

var store = Redux.createStore(counter, state)
var counterEl = document.getElementById('counter');
console.log(store);

function render() {
    console.log('In Render');
    console.log(store.getState());
    var state = store.getState();
    counterEl.innerHTML = state
        .count
        .toString();
}

store.subscribe(render);

// ACTIONS
document
    .getElementById('add')
    .addEventListener('click', function () {
        store.dispatch({type: 'ADD'});

    });

document
    .getElementById('minus')
    .addEventListener('click', function () {
        store.dispatch({type: 'MINUS'});

    });

document
    .getElementById('reset')
    .addEventListener('click', function () {
        store.dispatch({type: 'RESET'});

    });