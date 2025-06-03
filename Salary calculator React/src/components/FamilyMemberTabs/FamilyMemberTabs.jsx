import React from 'react';
import SalaryCalculator from '../SalaryCalculator/SalaryCalculator';

const FamilyMemberTabs = ({ onNameChange, onNetSalaryChange }) => {
    return (
        <div id="component">
            <SalaryCalculator onNameChange={onNameChange} onNetSalaryChange={onNetSalaryChange} />
        </div>
    );
};

export default FamilyMemberTabs;
