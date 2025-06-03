import React from 'react';

const FamilyDiscount = ({ familyMembers, beneficiaryFamilyMembers, memberChange, beneficiaryChange }) => {
    const handleFamilyMembersChange = (value) => {
        const adjustedBeneficiaries = Math.min(beneficiaryFamilyMembers, value);
        handleBeneficiaryFamilyMembersChange(adjustedBeneficiaries);
        memberChange(value);
    };

    const handleBeneficiaryFamilyMembersChange = (value) => {
        beneficiaryChange(value);
    };

    return (
        <div>
            <button id="familyMembersButton" onClick={() => handleFamilyMembersChange(Math.max(0, familyMembers - 1))}>-</button>
            <span>{familyMembers}</span>
            <button id="familyMembersButton" onClick={() => handleFamilyMembersChange(familyMembers + 1)}>+</button>
            <span>Eltartott, ebből kedvezményezett:</span>
            <button id="familyMembersButton" onClick={() => handleBeneficiaryFamilyMembersChange(Math.max(0, beneficiaryFamilyMembers - 1))}>-</button>
            <span>{beneficiaryFamilyMembers}</span>
            <button id="familyMembersButton" onClick={() => handleBeneficiaryFamilyMembersChange(beneficiaryFamilyMembers + 1)}>+</button>
            <br />
        </div>
    );
};

export default FamilyDiscount;
