import React from 'react';

const HouseholdSummary = ({ householdName, householdNetSalary }) => {
    return (
        <div id="component">
            <h2 id="headText">Háztartás összesített jövedelme</h2>
            <table>
                <thead>
                    <tr>
                        <th>Családtag</th>
                        <th>Nettó bér</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{householdName}</td>
                        <td>{householdNetSalary.toLocaleString('hu-HU')} Ft</td>
                    </tr>
                    <tr>
                        <td>Összesen:</td>
                        <td>{householdNetSalary.toLocaleString('hu-HU')} Ft</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default HouseholdSummary;
