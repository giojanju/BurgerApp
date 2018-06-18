import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classess from './ContactData.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

export default class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your name',
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
				},
				valid: false,
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP COde',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Contry',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your E-Mail',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'fastest', displayValue: 'Fastets'},
						{value: 'cheapes', displayValue: 'Cheapes'},
					]
				},
				value: '',
			},
		},
		loading: false
	};

	orderHandler = (event) => {
		event.preventDefault();
		console.log('ok');
		this.setState({loading: true});

		const formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
		}

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.totalPrice,
			orderData: formData
		};
		axios.post('/orders.json', order)
			.then(resp => {
				this.setState({loading: false})
				// this.props.history.push('/');
			})
			.catch(err => console.log(err));
	}

	checkValidity(value, rules) {
		let isValid = false;

		if (rules.required)  {
			isValid = value.trim() !== '';
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength; 
		}

		return isValid;
	}	

	inputChangedHandler = (event, inputId) => {
		const updatedOrderForm = {
			...this.state.orderForm
		}

		const updatedFormElement = {
			...updatedOrderForm[inputId]
		}
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedOrderForm[inputId] = updatedFormElement;
		console.log(updatedFormElement);
		this.setState({orderForm: updatedOrderForm})
	}

	render() {
		const formELementsArray = [];
		for (let key in this.state.orderForm) {
			formELementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}
		let form = (
			<form onSubmit={this.orderHandler}>
				{formELementsArray.map(formElement => (
					<Input
						key={formElement.id} 
						elementType={formElement.config.elementType} 
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						changed={(event) => this.inputChangedHandler(event, formElement.id)}
					/>
				))}
				<Button btnType="Success">ORDER</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner />
		}
		return(
			<div className={classess.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}