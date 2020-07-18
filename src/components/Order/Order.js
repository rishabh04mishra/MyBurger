import React from 'react';
import classes from './Order.module.css';

let order = (props) => {
    let ingredients = [];

    for ( let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name:ingredientName,
                amount: props.ingredients[ingredientName]
            });
    }

    let ingredientOutput = ingredients.map(ig =>{
        return <span 
        style={{
            display:'inline-block',
            margin:'0 8px',
            textTransform: 'capitalize',
            border:'1px solid #ccc',
            padding:'5px'
            }}
        key={ig.name}>{ig.name} ({ig.amount})</span>;
    })
    return (
        <div className={classes.Order}>
        <p>Ingredients:{ingredientOutput}</p>
        <p>Price:<strong>{props.price}</strong></p>
    </div>
    )
    }

export default order;