// Import dependencies
import React from 'react';

// Import moment js
import moment from 'moment';

const FormattedDate = ({timestamp}) => {
    // Create a date string from the timestamp
    const formattedDateString = new Date (parseInt(timestamp)).toString();

    return <p>{moment(formattedDateString).format('DD/MM/YYYY')}</p>
}

export default FormattedDate;