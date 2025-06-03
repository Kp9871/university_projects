import React, { useState, useEffect } from 'react';
import TextInputWithLabel from './components/TextWithInputLabel';
import GrossSalary from './components/GrossSalary';
import Discount from './components/Discount';
import DatePickerModal from './components/DatePickerModal';
import MarriageLegitimacyChecker from './components/Legitimacy';
import FamilyDiscount from './components/FamilyDiscount';

const SalaryCalculator = ({ onNameChange, onNetSalaryChange }) => {
    const [grossSalary, setGrossSalary] = useState(0);
    const [netSalary, setNetSalary] = useState(0);
    const [name, setName] = useState('');
    const [isSZJAFree, setIsSZJAFree] = useState(false);
    const [isPersonalTaxDiscount, setIsPersonalTaxDiscount] = useState(false);
    const [isFirstMarriageBenefit, setIsFirstMarriageBenefit] = useState(false);
    const [marriageDate, setMarriageDate] = useState(null);
    const [isMarriageLegit, setIsMarriageLegit] = useState(false);
    const [isFamilyDiscount, setIsFamilyDiscount] = useState(false);
    const [familyMembers, setFamilyMembers] = useState(0);
    const [beneficiaryFamilyMembers, setBeneficiaryFamilyMembers] = useState(0);

    useEffect(() => {
        const calculateNetSalary = () => {
            let tax = 0;
            let marriageFunds = 0;
            if (isSZJAFree) {
                if (grossSalary > 499952) {
                    tax = (grossSalary - 499952) * 0.15;
                } else {
                    tax = 0;
                }
            } else {
                tax = grossSalary * 0.15;
            }

            tax += grossSalary * 0.185;

            if (isFirstMarriageBenefit && isMarriageLegit) {
                marriageFunds += 5000;
            }

            if (isFamilyDiscount) {
                let familyDiscountAmount = 0;
                if (beneficiaryFamilyMembers === 1) {
                    familyDiscountAmount = 10000 * familyMembers;
                } else if (beneficiaryFamilyMembers === 2) {
                    familyDiscountAmount = 20000 * familyMembers;
                } else if (beneficiaryFamilyMembers >= 3) {
                    familyDiscountAmount = 33000 * familyMembers;
                }
                if (tax > familyDiscountAmount) {
                    tax -= familyDiscountAmount;
                } else {
                    tax = 0;
                }
            }

            if (isPersonalTaxDiscount) {
                if (tax > 77300) {
                    tax -= 77300;
                } else {
                    tax = 0;
                }
            }

            const calculatedNetSalary = marriageFunds + grossSalary - tax;
            setNetSalary(calculatedNetSalary);
        };
        onNameChange(name);
        onNetSalaryChange(netSalary);
        calculateNetSalary();
    }, [name, netSalary, onNameChange, onNetSalaryChange, grossSalary, isSZJAFree, isPersonalTaxDiscount, isFirstMarriageBenefit, isMarriageLegit, isFamilyDiscount, familyMembers, beneficiaryFamilyMembers]);

    const handleGrossSalaryChange = (newGrossSalary) => {
        setGrossSalary(newGrossSalary);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSZJAChange = () => {
        setIsSZJAFree(!isSZJAFree);
    };

    const handlePersonalTaxDiscountChange = () => {
        setIsPersonalTaxDiscount(!isPersonalTaxDiscount);
    };

    const handleFirstMarriageBenefitChange = () => {
        setIsFirstMarriageBenefit(!isFirstMarriageBenefit);
    };

    const handleMarriageDateSelect = (date) => {
        const selectedDate = new Date(date);
        setMarriageDate(selectedDate);
    };

    const handleMarriageLegitimacy = (isLegit) => {
        setIsMarriageLegit(isLegit);
    };

    const handleIsFamilyDiscountChange = () => {
        setIsFamilyDiscount(!isFamilyDiscount);
    };

    const handleFamilyMembersChange = (value) => {
        setFamilyMembers(value);
    };

    const handleBeneficiaryFamilyMembersChange = (value) => {
        if (value <= familyMembers) {
            setBeneficiaryFamilyMembers(value);
        }
    };

    return (
        <div>
            <h1 id="headText">XY Bérének Kiszámítása</h1>
            <TextInputWithLabel name="Családtag neve" placeholder="Enter your name" value={name} onChange={handleNameChange} instruction="Add meg a családtag nevét!" />
            <TextInputWithLabel name="Bruttó bér" placeholder="Enter gross salary" value={grossSalary} onChange={(e) => handleGrossSalaryChange(parseFloat(e.target.value))} instruction="Add meg a bruttó béredet!" isNumeric={true} />
            <GrossSalary onGrossSalaryChange={handleGrossSalaryChange} grossSalary={grossSalary} />
            <h2 id="headText">Kedvezmények</h2>
            <Discount name="25 év alattiak SZJA mentessége" onChange={handleSZJAChange} />
            <div id="marriageDiv">
                <Discount name="Friss házasok kedvezménye" onChange={handleFirstMarriageBenefitChange} />
                {isFirstMarriageBenefit && (
                    <>
                        <DatePickerModal onSelect={handleMarriageDateSelect} />
                        <MarriageLegitimacyChecker marriageDate={marriageDate} onLegitimacyChange={handleMarriageLegitimacy} /> {/* Pass callback function to handle legitimacy */}
                    </>
                )}
            </div>
            <Discount name="Személyi adókedvezmény" onChange={handlePersonalTaxDiscountChange} />
            <Discount name="Családi kedvezmény" onChange={handleIsFamilyDiscountChange} />
            {isFamilyDiscount && (
                <FamilyDiscount familyMembers={familyMembers} beneficiaryFamilyMembers={beneficiaryFamilyMembers} memberChange={handleFamilyMembersChange} beneficiaryChange={handleBeneficiaryFamilyMembersChange} />
            )}
            <div id="centerDiv">
                <h2 id="headText">Nettó bér:</h2>
                <h2>{netSalary.toLocaleString('hu-HU')} Ft</h2>
            </div>
        </div>
    );
};

export default SalaryCalculator;
