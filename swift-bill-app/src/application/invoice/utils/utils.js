const getDateFormat = (date) => {
    let inputDate = new Date(date);
    let requiredDate = `${inputDate.getDate()}-${inputDate.getMonth()}-${inputDate.getFullYear()}`

    return requiredDate;
}

const getCommaSeparatedAmount = (amount) => {
    let numberFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR', currencyDisplay: 'code' });

    let requiredValue = numberFormat.format(amount).toString().split("INR")

    return requiredValue[1];
}

module.exports = {
    getDateFormat,
    getCommaSeparatedAmount
}