const getDateFormat = (date) => {
    let inputDate = new Date(date);
    let requiredDate = `${inputDate.getDate()}-${inputDate.getMonth()}-${inputDate.getFullYear()}`

    return requiredDate;
}

module.exports = {
    getDateFormat
}