import React from 'react';
import calsses from './Button.css';

const button = (props) => (
    <button
    	disabled={props.disabled}
        className={[calsses.Button, calsses[props.btnType]].join(' ')}
        onClick={props.clicked}
    >{props.children}</button>
);

export default button;