import { render } from '@testing-library/react';
import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/spinner/spinner'

class ContactData extends Component{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode:''
        },
        loading:false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        alert('You Countinue')
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'samba',
                address: {
                    street: 'india',
                    zipcode: '14563'
                }
            }
        }
        axios.post('/orders.json', order)
            .then(responce => {
                this.setState({ loading: false });
                this.props.history.push('/');
        })
            .catch(error => {
                this.setState({ loading: false});
            });
    }

    render() {
        let form = (
            <form>
                <input className="Input" type="text" name="name" placeholder="Enter your name" />
                <input className="Input" type="text" name="email" placeholder="Enter your email" />
                <input className="Input" type="text" name="street" placeholder="Enter your street" />
                <input className="Input" type="text" name="street" placeholder="Enter your postalcode" />
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
        );
        if (this.state.loading) {
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

export default ContactData;
   
