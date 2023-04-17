const roundOffAmount = (billAmount) => {
    let roundOffValue = {
        Operator_Sign: '',
        Deviation_Value: parseFloat((0.00).toFixed(2)),
        Net_Bill_Amount: billAmount
    }
    let billIntergerValue = parseInt(billAmount);
    let decimalValue = billAmount - billIntergerValue;
    if(decimalValue >= 0.50){
        roundOffValue.Deviation_Value = (1 - decimalValue).toFixed(2);
        roundOffValue.Operator_Sign = "+";
        roundOffValue.Net_Bill_Amount = (billAmount + parseFloat(roundOffValue.Deviation_Value)).toFixed(2);
    }
    if(decimalValue > 0 && decimalValue < 0.50){
        roundOffValue.Deviation_Value = decimalValue.toFixed(2);
        roundOffValue.Operator_Sign = "-";
        roundOffValue.Net_Bill_Amount = (billAmount - parseFloat(roundOffValue.Deviation_Value)).toFixed(2);
    }
    return roundOffValue;
}

const calculateBill = (data) => {

    let price = parseFloat(data.Price);
    let quantity = parseFloat(data.Quantity);
    let GST_Type = data.GST_Type;
    let totalBillValues = {}
    let totalPrice = ((price)*(quantity)).toFixed(2);

    if(GST_Type === 'IGST'){
        let totalGST = (totalPrice*0.18).toFixed(2);
        totalBillValues = {
            Total_Price: totalPrice,
            IGST: '18%',
            IGST_Amount: totalGST,
            Total_Bill: parseFloat(totalPrice) + parseFloat(totalGST)
        }

    } else{
        let totalCGST = (totalPrice*0.09).toFixed(2);
        let totalSGST = (totalPrice*0.09).toFixed(2);
        totalBillValues = {
            Total_Price: totalPrice,
            CGST: '9%',
            SGST: '9%',
            CGST_Amount: totalCGST,
            SGST_Amount: totalSGST,
            Total_Bill: parseFloat(totalPrice) + parseFloat(totalSGST) + parseFloat(totalCGST)
        }    
    }

    let roundOffValues = roundOffAmount(totalBillValues.Total_Bill);

    totalBillValues = {
        ...totalBillValues,
        ...roundOffValues
    };

    return totalBillValues;

}
 module.exports = {
    calculateBill
 }