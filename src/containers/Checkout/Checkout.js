import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSumary from '../../components/Order/CheckoutSumary/CheckoutSumary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
	state = {
		ingredients: null,
		price: 0
	};

	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	}

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	}

	componentWillMount() {
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		let price = 0;
		for (let param of query.entries()) {
			if (param[0] === 'price') {
				price = param[0];
			} else {
				ingredients[param[0]] = +param[1];
			}
		}

		this.setState({ingredients: ingredients, price: price})
	}

	render() {
		return(
			<div>
				<CheckoutSumary
					ingredients={this.state.ingredients}
					onCheckoutCancelled={this.checkoutCancelledHandler}
					onCheckoutContinued={this.checkoutContinuedHandler}
				/>
				<Route 
					path={this.props.match.path + '/contact-data'} 
					render={() => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} />)}
				/>
			</div>
		);
	}
}

export default Checkout; 