import React from 'react';
import classes from './Button.module.css'

let button = (props) => (
    
    <button
        disabled={props.disabled}
        className={[classes.Button,classes[props.btnType]].join(' ')} 
        onClick={props.clicked}>{props.children}</button>

)

export default button;