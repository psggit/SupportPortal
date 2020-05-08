import React, { useState } from "react";
// import "react-dates/initialize";
// import { DateRangePicker } from "react-dates";
// import "react-dates/lib/css/_datepicker.css";
import Icon from "../../components/icon"
import { NavLink } from 'react-router-dom'

function DatePicker() {
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [focusedInput, setFocusedInput] = useState(null);
//   const handleDatesChange = ({ startDate, endDate }) => {
//     setStartDate(startDate);
//     setEndDate(endDate);
//   };

  return (
    <div className="App" style={{"marginLeft": "156px", "marginTop":"15px"}}>
      {/* <NavLink><Icon name="logout" /></NavLink> */}
      {/* <DateRangePicker
        startDate={startDate}
        startDateId="tata-start-date"
        endDate={endDate}
        endDateId="tata-end-date"
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
      /> */}
    </div>
  );
    }
export default DatePicker;
