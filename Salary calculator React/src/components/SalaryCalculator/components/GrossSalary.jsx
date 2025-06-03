import React, { useState, useEffect } from 'react';

const GrossSalary = ({ onGrossSalaryChange, grossSalary }) => {
    const [sliderValue, setSliderValue] = useState(0);

    useEffect(() => {
        setSliderValue(grossSalary);
    }, [grossSalary]);

    const handleSliderChange = (e) => {
        const newSliderValue = parseInt(e.target.value);
        setSliderValue(newSliderValue);
        onGrossSalaryChange(newSliderValue);
    };

    const adjustGrossSalary = (percentageChange) => {
        const newGrossSalary = sliderValue * (1 + percentageChange / 100);
        setSliderValue(newGrossSalary);
        onGrossSalaryChange(newGrossSalary);
    };

    return (
        <div>
            <div>
                <input type="range" min="0" max="500000" value={sliderValue} onChange={handleSliderChange} />
            </div>
            <div>
                <button id="adjustSalaryButton" onClick={() => adjustGrossSalary(-5)}>-5%</button>
                <button id="adjustSalaryButton" onClick={() => adjustGrossSalary(-1)}>-1%</button>
                <button id="adjustSalaryButton" onClick={() => adjustGrossSalary(1)}>+1%</button>
                <button id="adjustSalaryButton" onClick={() => adjustGrossSalary(5)}>+5%</button>
            </div>
        </div>
    );
};

export default GrossSalary;
