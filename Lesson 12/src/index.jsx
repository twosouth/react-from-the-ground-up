import React from 'react';
import ReactDOM from 'react-dom';

const Hello = () => {
    return (
        <div>Hello world!</div>
    )
}
// a change

ReactDOM.render(
    <Hello />,
    document.getElementById("app")
);