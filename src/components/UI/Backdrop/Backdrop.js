import React from 'react';
import classes from './Backdrop.module.css'

let backdrop = (props) => (
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null

);

export default backdrop;