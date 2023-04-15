const getDocCenter = (doc) => {
    return doc.internal.pageSize.getWidth() / 2
};


const setBillHeader = (doc, pdfData, yCoordinate) => {
    // Set Headers
    const center = getDocCenter(doc);
    doc.text('GSTIN : 1234567890', 10, yCoordinate);
    
    // Set Title
    let title = [
      'Tax Invoice',
      'M/s. Shree Ganesh Plastic Pipe Factory',
      'Address'
    ]
    yCoordinate += 10;
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bolditalic');
    doc.text(title, center, yCoordinate, {align: 'center'});
    console.log(yCoordinate);
    yCoordinate = 10 + (title.length)*10

    return yCoordinate
};

const setInvoiceDetails = (doc, pdfData, yCoordinate) => {
    const center = getDocCenter(doc);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    // Set font size and font style for the invoice details
    let invoiceKey = ['Invoice Number', 'Date' ];
    let colans = [':', `:`]
    let invoiceData = [
        `${pdfData.Invoice_Number}`,
        `${pdfData.Date}`
      ]
    doc.rect(10, yCoordinate, center-10, 15 )
    doc.rect(center, yCoordinate, center-10, 15 )
    yCoordinate += 5;
    let xCoordinate = 15;
    doc.text(invoiceKey, xCoordinate, yCoordinate);
    const textWidth = doc.getTextWidth(invoiceKey[0]);
    xCoordinate += 10 + textWidth;
    doc.text(colans, xCoordinate, yCoordinate);
    xCoordinate += 10
    doc.text(invoiceData, xCoordinate, yCoordinate);

    invoiceKey = ['Place of supply', 'Vehicle No.'];
    invoiceData = [
        `${pdfData.Place_Of_Supply}`,
        `${pdfData.Vehicle_Number}`
      ]
    xCoordinate = center + 5;
    doc.text(invoiceKey, xCoordinate , yCoordinate);
    xCoordinate += 10 + textWidth
    doc.text(colans, xCoordinate, yCoordinate);
    xCoordinate += 10
    doc.text(invoiceData, xCoordinate, yCoordinate);
    return yCoordinate + 10;
}

const setAddresses = (doc, pdfData, yCoordinate) => {
    const center = getDocCenter(doc);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    // Set font size and font style for the invoice details
    let billingData = ['Billed to:', `${pdfData.Billing_Address}`, `GSTIN/UIN : \t ${pdfData.GST_Number}`];

    doc.rect(10, yCoordinate, center-10, 23 )
    doc.rect(center, yCoordinate, center-10, 23 )
    yCoordinate += 5;
    let xCoordinate = 15;
    doc.text(billingData, xCoordinate, yCoordinate);

    billingData = ['Shipped to:', `${pdfData.Shipping_Address}`, `GSTIN/UIN : \t ${pdfData.GST_Number}`];
    xCoordinate = center + 5;
    doc.text(billingData, xCoordinate, yCoordinate);

    return yCoordinate + 18;

}

const setInVoiceAmount = (doc, pdfData, yCoordinate) => {
    
    const headers = [['S.N.', 'Description of Goods', 'HSN/SAC\nCode', 'Qty', 'Unit', 'Price', 'Ammount']];
    const data = [  ['1', `${pdfData.Description_Of_Goods} (${pdfData.Pipe_Size})`, `${pdfData.HSN_Number}`, `${pdfData.Quantity}`, 'Kg', `${pdfData.Price}`, `${pdfData.Total_Price}`],['1', 'New', '2', '5', 'Kg', '500', '2500'], ['1', 'New', '2', '5', 'Kg', '500', '2500']
    ];

    doc.setFontSize(12);
    const cellPadding = 5

    doc.autoTable({
        head: headers,
        body: data,
        startY: yCoordinate,
        theme: 'plain',
        styles: {
          fontSize: 12
        },
        columnStyles: { 0: { lineWidth: 0.2},
            1: {lineWidth: 0.2},
            2: {lineWidth: 0.2},
            3: {lineWidth: 0.2},
            4: {lineWidth: 0.2},
            5: {lineWidth: 0.2},
            6: {lineWidth: 0.2}
        },
        headStyles:{
            lineColor: [80],
            lineWidth: 0.2,
            fontStyle: 'bold'
        },
        margin: 10,
        cellPadding: cellPadding,
        tableLineColor: [80],
        tableLineWidth: 0.2,
      });

      console.log(doc.lastAutoTable);
      return doc.lastAutoTable;
}

const setGstCalculations = (doc, pdfData, yCoordinate, lastcolumnWidth) =>{
    let dividerCoordinate = doc.internal.pageSize.getWidth()-lastcolumnWidth -10
    doc.rect(10, yCoordinate,  dividerCoordinate-10, 23)
    doc.rect(dividerCoordinate, yCoordinate, lastcolumnWidth, 23)
    const gstCalculationText = ['']
    const gstCalculationValues = [`${pdfData.Total_Price}`]
    if(pdfData.GST_Type === 'IGST'){
        gstCalculationText.push(`Add   : IGST\t\t@ ${pdfData.IGST}`)
        gstCalculationValues.push(`${pdfData.IGST_Amount}`)
    } else {
        gstCalculationText.push(`Add   : CGST\t\t@ ${pdfData.CGST}`)
        gstCalculationText.push(`Add   : SGST\t\t@ ${pdfData.SGST}`)
        gstCalculationValues.push(`${pdfData.CGST_Amount}`)
        gstCalculationValues.push(`${pdfData.SGST_Amount}`)
    }

    gstCalculationText.push(`Add   : Rounded Off (${pdfData.Operator_Sign})`)
    gstCalculationValues.push(`${pdfData.Operator_Sign}${pdfData.Deviation_Value}`)
    yCoordinate += 5
    let xCoordinate = 15;
    doc.text(gstCalculationText, xCoordinate ,yCoordinate)
    doc.text(gstCalculationValues, dividerCoordinate+10, yCoordinate)
    return yCoordinate+23;

}
const setTotalAmmount = (doc, pdfData, yCoordinate) =>{
    let dividerCoordinate = doc.internal.pageSize.getWidth() -10 -10
    doc.rect(10, yCoordinate, dividerCoordinate, 23 )
    const grandTotalText = ['Grand Total'] 
    const grandTotalValue = [`${pdfData.Net_Bill_Amount}`] 
    yCoordinate += 5
    let xCoordinate = 15;
    doc.text(grandTotalText, xCoordinate ,yCoordinate)
    doc.text(grandTotalValue, dividerCoordinate-10, yCoordinate)
    return yCoordinate+23;

}

const setFooters = (doc, pdfData, yCoordinate) =>{
    const center = getDocCenter(doc);
    doc.rect(10, yCoordinate, center-10, 40 )
    doc.rect(center, yCoordinate, center-10, 40 )

    const termsAndConditionsHeading = ['Terms & Conditions']
    const termsAndConditions = ['E.& O.E.',
    '1. Goods once sold will not be taken back.',
    '2. Interest @ 18% p.a. will be charged if the payment is not made with in the stipulated time.',
    '3. Subject to Ratia, Haryana Jurisdiction only.']

    const receiverSignature = ['Receiver\'s Signature : ']

    const firmSignatureName = ['For M/s. SHREE GANESH PLASTIC PIPE FACTORY']

    const authorisedSignatory = ['Authorised Signatory']

    console.log(doc.getFont());
    yCoordinate += 5;
    let xCoordinate = 15;
    doc.setFont('helvetica', 'bold');
    console.log(doc.getFont());
    doc.text(termsAndConditionsHeading, xCoordinate, yCoordinate);
    doc.setFont('helvetica', 'normal');
    doc.text(termsAndConditions, xCoordinate, yCoordinate + 5, {maxWidth: center-20});
    xCoordinate = center + 5;
    doc.text(receiverSignature, xCoordinate, yCoordinate)
    yCoordinate += 10;
    doc.line(xCoordinate - 5, yCoordinate, xCoordinate + center -15, yCoordinate) 
    yCoordinate += 5;
    doc.setFontSize(10);
    doc.text(firmSignatureName, doc.internal.pageSize.getWidth()-11, yCoordinate, {maxWidth: center-20, align: 'right'})
    yCoordinate += 15;
    doc.text(authorisedSignatory, doc.internal.pageSize.getWidth()-11, yCoordinate, {maxWidth: center-20, align: 'right'})
}

module.exports = {
    setBillHeader,
    setInvoiceDetails,
    setAddresses,
    setInVoiceAmount,
    setGstCalculations,
    setTotalAmmount,
    setFooters
}