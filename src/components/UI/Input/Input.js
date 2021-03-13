import React from 'react';
import './Input.css';

const Input = (props) => {
    let inputElement = null;
    let validationError = null;
    const inputClasses = ['InputElement'];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push('Invalid');
    }

    
    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                {...props.elementConfig}
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}
            />
            break;
        case ('textarea'):
            inputElement = <textarea
                {...props.elementConfig}
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}
            />
            break;
        case ('select'):
            inputElement = (<select
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}
            >
                {props.elementConfig.options.map(option => (
                    <option value={option.value} key={option.value}>
                        {option.displayValue}
                    </option>
                ))}
                </select >
            );
            break;
        default:
            inputElement = <input
                {...props.elementConfig}
                className={inputClasses.join(' ')}
                value={props.value} />
    }
    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
}
   

export default Input;