import React from 'react';
import Aux from '../../../hoc/_Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
        return <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
    }); 

    return (
        <Aux>
            <h3>You order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total price: <span>{props.totalPrice}</span></p>
            <p>Continue to checkout?</p>
            <Button clicked={props.purchaseCancle} btnType="Danger">CANCLE</Button>
            <Button clicked={props.purchaseContinue} btnType="Success">CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;