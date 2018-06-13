import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classess from './CheckoutSumary.css';

const checkoutSumary = (props) => {
	return (
		<div className={classess.CheckoutSumary}>
			<h1>we hope it tastes well!</h1>
			<div style={{with: '300px', height: '300px', margin: 'auto'}}>
				<Burger ingredients={props.ingredients} />
			</div>
			<Button btnType="Danger" clicked={props.onCheckoutCancelled}>CANCLE</Button>
			<Button btnType="Success" clicked={props.onCheckoutContinued}>CONTINUE</Button>
		</div>
	);
}

export default checkoutSumary;