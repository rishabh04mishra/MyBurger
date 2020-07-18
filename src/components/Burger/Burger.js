import React from 'react'
import classes from './Burger.module.css'
import BurgerIngredient from './Burgeringredient/Burgeringredient'

let burger = (props) => {
    let transIngredients = Object.keys(props.ingredients)
    .map(igkey => {
        return [...Array(props.ingredients[igkey])].map((_, i) => {
            //console.log([...Array(props.ingredients[igkey])]);
            return <BurgerIngredient key={igkey + i} type={igkey} />;

        });
    })
    .reduce((arr,el) => {
        return arr.concat(el)
    }, []);

    if(transIngredients.length === 0){
        transIngredients=<p>Please add ingredients</p>;
    }
    //console.log(transIngredients);
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;
