import React from 'react';
import './Burger.css';
import BurgerIngredient from '../Burger/BurgerIngrediants/BurgerIngrediant';


const burger = (props) => {
    let transformedIngredientes = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])]
                .map((_, i) => {
                    return <BurgerIngredient key={igKey + 1} type={igKey} />
                })
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if (transformedIngredientes.length === 0) {
        transformedIngredientes = <p>Please start adding ingredients</p>
    }
    return (
        <div className="Burger">
            <BurgerIngredient type="bread-top" />
            {transformedIngredientes}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;

