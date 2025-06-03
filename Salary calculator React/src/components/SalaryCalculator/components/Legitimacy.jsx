import React, { useState, useEffect } from 'react';

const Legitimacy = ({ marriageDate, onLegitimacyChange }) => {
    const [eligible, setEligible] = useState(false);

    useEffect(() => {
        const checkLegitimacy = () => {
            if (!marriageDate) {
                onLegitimacyChange(false);
                setEligible(false);
                return;
            }

            const today = new Date();
            const oneMonthAfterMarriage = new Date(marriageDate);
            oneMonthAfterMarriage.setMonth(oneMonthAfterMarriage.getMonth() + 1);

            const twoYearsAgo = new Date(today);
            twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

            const isWithinTwoYears = marriageDate > twoYearsAgo;
            const isFirstMonthAfterMarriage = today > oneMonthAfterMarriage;

            const isEligible = isWithinTwoYears && isFirstMonthAfterMarriage;

            onLegitimacyChange(isEligible);
            setEligible(isEligible);
        };

        checkLegitimacy();
    }, [marriageDate, onLegitimacyChange]);

    return (
        <div>
            <button id="eligibilityButton" disabled className={eligible ? 'eligible' : 'not-eligible'}>
                {eligible ? 'Jogosult' : 'Nem jogosult'}
            </button>
        </div>
    );
};

export default Legitimacy;
