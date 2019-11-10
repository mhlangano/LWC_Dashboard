const calculateAgeHelper = (inputValue) => {
    var dayValue = inputValue.substring(0, 2);
    var monthValue = inputValue.substring(2, 4);
    var yearValue = inputValue.substring(4, 8);

    var convertedDOBDate = new Date(yearValue, monthValue - 1, dayValue);
    var currentDate = new Date();
    var diff = currentDate.getTime() - convertedDOBDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

const formattedDateEstatementRegistration = (inputDate) => {
    var returnValue = '';
    if (inputDate) {
        let eStatementFullDate = inputDate;
        let eStatementOnlyDate = eStatementFullDate.substring(0, 10);
        let dateValue = new Date(eStatementOnlyDate);
        returnValue = this.getDate(dateValue);
    }
    return returnValue;
}
 
const formattedDate = (inputDate) => {
    var returnValue = '';
    if (inputDate) {
        let dateValue = new Date(inputDate);
        returnValue = this.getDate(dateValue);
    }
    return returnValue;
}

const convertToValidDate = (inputValue) => {
    var yearValue = inputValue.substring(0, 4);
    var monthValue = inputValue.substring(4, 6);
    var dayValue = inputValue.substring(6, 8);

    let dateValue = new Date(yearValue, monthValue - 1, dayValue);
    return dateValue;
}

const convertToValidDateCallHistory = (inputValue) => {
    var dayValue = inputValue.substring(0, 2);
    var monthValue = inputValue.substring(2, 4);
    var yearValue = inputValue.substring(4, 8);

    let dateValue = new Date(yearValue, monthValue - 1, dayValue);
    return this.getDate(dateValue);
}

const getDate = (dateValue) => {
    if (typeof dateValue === "undefined") {
        return 'Invalid Date';
    }
    let monthNames = [
        "January", "February", "March", "April",
        "May", "June", "July", "August", "September",
        "October", "November", "December"
    ];

    let day = dateValue.getDate();
    let monthIndex = dateValue.getMonth();
    let year = dateValue.getFullYear();
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

const capitalizeOnlyFirstLetter = (stringValue) => {
    var returnValue = '';
    if (stringValue) {
        let lowerCaseString = stringValue.toLowerCase();
        returnValue = lowerCaseString.charAt(0).toUpperCase() + lowerCaseString.slice(1);
    }
    return returnValue;
}

const formattedTime = (inputTime) => {
    var returnValue = '';
    var hoursValue = inputTime.substring(0, 2);
    var minutesValue = inputTime.substring(3, 5);
    returnValue = hoursValue + ":" + minutesValue + "am";
    if (hoursValue > 11) {
        returnValue = hoursValue + ":" + minutesValue + "pm";
    }
    return returnValue;
}

const capitalizeFirstLetter = (stringValue) => {
    var returnValue = '';
    if (stringValue) {
        let splitString = stringValue.toLowerCase().split(' ');
        for (let i = 0; i < splitString.length; i++) {
            splitString[i] = splitString[i].charAt(0).toUpperCase() + splitString[i].substring(1);
        }
        returnValue = splitString.join(' ');
    }
    return returnValue;
}
 
export { calculateAgeHelper, formattedDateEstatementRegistration, formattedDate, convertToValidDate, convertToValidDateCallHistory, getDate, capitalizeOnlyFirstLetter, formattedTime, capitalizeFirstLetter }
