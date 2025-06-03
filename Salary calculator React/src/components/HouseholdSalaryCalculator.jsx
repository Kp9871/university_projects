import React, { useState } from 'react';
import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";

const HouseholdSalaryCalculator = () => {
    const [householdName, setHouseholdName] = useState('');
    const [householdNetSalary, setHouseholdNetSalary] = useState(0);

    const handleNameChange = (newName) => {
        setHouseholdName(newName);
    };

    const handleNetSalaryChange = (newNetSalary) => {
        setHouseholdNetSalary(newNetSalary);
    };

    return (
        <>
            <div id="jobbDiv">
                <FamilyMemberTabs onNameChange={handleNameChange} onNetSalaryChange={handleNetSalaryChange} />
            </div>
            <div id="jobbDiv">
                <HouseholdSummary householdName={householdName} householdNetSalary={householdNetSalary} />
            </div>
        </>
    );
};

export default HouseholdSalaryCalculator;
