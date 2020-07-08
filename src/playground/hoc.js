//higher order component -  a component that renders another component 
//advantages
//reuse code 
//render hijacking 
//prop manipulation
//abstract state
import React from 'react';
import ReactDOM from 'react-dom';

const Info =(props) => {
    return (
    <div>
        <h1>Info</h1>
        <p>the info is {props.info}</p>
    </div>
    )
};

const withadminwarning=(Wrappedcomponent)=> {
    return (props)=> (
        <div>
         {props.isadmin  &&  <p>this is private info please keep it a secret</p>}
        <Wrappedcomponent {...props} />   
        </div>
);    
};
//hoc-admininfo
//{...props} used coz to pass the props to the child
const Admininfo=withadminwarning(Info);

const requireauth=(Wrappedcomponent) => {
    return (props) => (
        <div>
         {props.auth ? <Wrappedcomponent {...props} /> : <p>please log in to view the info</p>} 
        </div>
    )
};

const Authinfo=requireauth(Info);
ReactDOM.render(<Authinfo auth={true} info="these r the details" />,document.getElementById('app'));