import React  from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

let checkoutSummary =(props) => {
    return(
        <div className={classes.CheckoutSummary}>
            <h1>Have a tasty burger</h1>
            <div style={{ width:'100%', margin:'auto' }}>
                <Burger ingredients={ props.ingredients}/>
            </div>
            <Button btnType="Danger"
            clicked={props.checkotCancelled}>CANCEL</Button>
            <Button btnType="Success"
            clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    )
}

export default checkoutSummary;
