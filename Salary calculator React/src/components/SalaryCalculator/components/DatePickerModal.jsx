import React, { useState } from 'react';
import TextInputWithLabel from './TextWithInputLabel';

const DatePickerModal = ({ onSelect }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const handleSave = () => {
        onSelect(selectedDate);
        setIsDatePickerOpen(false);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    return (
        <div>
            <button id="marriageButton" onClick={() => setIsDatePickerOpen(true)}>Select Marriage Date</button>
            {isDatePickerOpen && (
                <div id="dateContainerDiv">
                    <div id="datePickDiv">
                        <p>A kedvezmény először a házasságkötést követő hónapra vehető igénybe és a házassági életközösség alatt legfeljebb 24 hónapon keresztül jár.</p>
                        <br />
                        <TextInputWithLabel name="Add meg a házasságkötés dátumát:" placeholder="YYYY/MM/DD" onChange={handleDateChange} instruction="Például: 2000/10/25" />
                        <br />
                        <button onClick={handleSave}>Save</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DatePickerModal;
