import React from 'react';

// DateUtilities Component
const Utilities_Dates = () => {
  // Function to format date from yyyy-mm-dd hh:mm:ss to dd/mm/yyyy
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Example of another function (just as a placeholder for more utilities)
  const getDayOfWeek = (dateString: string): string => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()];
  };

  return {
    formatDate,
    getDayOfWeek
  };
};

export default Utilities_Dates;
