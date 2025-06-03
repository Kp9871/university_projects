import React from 'react';

const Discount = ({ name, onChange }) => {
    return (
        <div className="switchContainer">
            <input type="checkbox" id={name} name={name} className="checkbox" onChange={onChange} />
            <label htmlFor={name} className="switch"></label>
            <span className="label">{name}</span>
        </div>
    );
};

export default Discount;
