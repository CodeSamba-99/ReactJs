import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/spinner/spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../containers/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component{
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder:'Your Name'
                },
                value: '',
                validation: {
                    required:true
                },
                valid: false,
                touched:false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                validation: {
                    required: true
                },
                value: '',
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zipcode'
                },
                validation: {
                    required: true
                },
                value: '',
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                validation: {
                    required: true
                },
                value: '',
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email'
                },
                validation: {
                    required: true
                },
                value: '',
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'Chepest', displayValue: 'Chepest' },
                    ],
                    
                },
                validation: {
                    required: true
                },
                value: 'fastest',
                valid: true,
                touched: false
            }         
        },
        formIsValid:false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        alert('You Countinue')
       // this.setState({ loading: true });
        let formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier];
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }
        this.props.onOrderBurgger(order, this.props.token);   // post data
    }

    inputOnChangeEventHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid:formIsValid });
    }

    checkValidity(value, rules) {
        let isValid = false;
        if (rules.required) {
            isValid = value.trim() !== '';
        }
        // place && isValid in every next if condition 
        // which means checking the other validations
        return isValid;
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        valid={formElement.config.valid}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputOnChangeEventHandler(event, formElement.id)}
                    />
                ))}
                <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>Order</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner/>
        }

        return (
            <div className="ContactData">
                <h4>Enter you contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.orders.loading,
        token:state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurgger:(orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
   
