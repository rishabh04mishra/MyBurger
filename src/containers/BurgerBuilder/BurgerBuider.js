import React, {Component} from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
//import { object } from 'prop-types';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as burgerBuilderActions from '../../store/actions/index';


export class BurgerBuilder extends Component{
    state={
        purchasing: false
    }

    componentDidMount () {
        this.props.onInitIngredients();
        
    }

    updatePurchaseState (ingredients) { 
        let sum =Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, el) => {
                return sum + el;
            },0);
            return sum > 0
    }

    purchaseHandler= () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing:true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
        
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing:false})
    }
    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }
    
    render(){
        let disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary= null

        let burger=this.props.error ? <p>there is error</p> : <Spinner/>;
        if(this.props.ings){
            burger=(
                <Aux>
                    <Burger ingredients ={this.props.ings}/>
                    <BuildControls
                        ingredientAdded ={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price ={this.props.price} 
                        order={this.purchaseHandler} 
                        isAuth={this.props.isAuthenticated}/>
                        
                </Aux>
        );
        orderSummary=<OrderSummary 
            ingredients={this.props.ings}
            price={this.props.price}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}/> ;
            }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

let mapStateToProps= state => {
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated:state.auth.token !== null
    };
}

let mapDispatchToProps= dispatch => {
    return{
        onIngredientAdded: (ingname) => dispatch(burgerBuilderActions.addIngredient(ingname)),
        onIngredientRemoved: (ingname) => dispatch(burgerBuilderActions.removeIngredient(ingname)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase : ()=> dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath :(path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));