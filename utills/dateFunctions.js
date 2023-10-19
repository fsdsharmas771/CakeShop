export const getTimeStampYearMonthDay = () => {
    let currentTimeStamp;
    const dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    // validating the month if less that 10
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    currentTimeStamp = year + "-" + month + "-" + day;
    return currentTimeStamp;
};