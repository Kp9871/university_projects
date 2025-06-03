import React from 'react';

const TextInputWithLabel = ({ name, placeholder, value, onChange, instruction, isNumeric }) => {
    const sanitizedValue = isNumeric ? (isNaN(value) ? 0 : value) : value;

    return (
        <div>
            <label htmlFor={name}>{name}</label>
            <br />
            <input type="text" id={name} name={name} placeholder={placeholder} value={sanitizedValue} onChange={onChange} />
            <br />
            <label id="tooltip" htmlFor={name}>{instruction}</label>
        </div>
    );
};

export default TextInputWithLabel;
