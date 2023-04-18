import { ToWords } from 'to-words';

const getDateFormat = (date) => {
    let inputDate = new Date(date);
    let requiredDate = `${inputDate.getDate()}-${inputDate.getMonth()}-${inputDate.getFullYear()}`

    return requiredDate;
}

const getCommaSeparatedAmount = (amount) => {
    let numberFormat = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', currencyDisplay: 'code' });

    let requiredValue = numberFormat.format(amount).toString().split("INR")

    return requiredValue[1];
}

const getAmountInWords = (amount) => {
    const toWords = new ToWords({
        localeCode: 'en-IN',
        converterOptions: {
          currency: true,
          ignoreDecimal: true,
          ignoreZeroCurrency: false,
          doNotAddOnly: false,
          currencyOptions: { // can be used to override defaults for the selected locale
            name: 'Rupee',
            plural: 'Rupees',
            symbol: '₹',
            fractionalUnit: {
              name: 'Paisa',
              plural: 'Paise',
              symbol: '',
            },
          }
        }
      });

    let words = toWords.convert(amount);
    return words;

};

export{
    getDateFormat,
    getCommaSeparatedAmount,
    getAmountInWords
}