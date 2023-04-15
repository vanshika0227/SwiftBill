const getDocCenter = (doc) => {
    return doc.internal.pageSize.getWidth() / 2
};


const setBillHeader = (doc, pdfData, yCoordinate) => {
    // Set Headers
    const center = getDocCenter(doc);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
        doc.text('GSTIN: 06ACKFS2799E1ZQ', 8, yCoordinate, {align: 'left'});

    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('Tax Invoice', center, yCoordinate, {align: 'center'});

    // Set Mobile
    let mobile = [
      'M. 95418-80151',
      'M. 94161-27747'
    ]
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(mobile, 205, yCoordinate, {align: 'right'});
    
    // Set Title
    yCoordinate += 10;
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bolditalic');
    doc.text('M/s. SHREE GANESH PLASTIC PIPE FACTORY', center, yCoordinate, {align: 'center'});

    // Set Address
    let address = [
        'Near Imperial Garden, Fatehabad Road, RATIA-125051',
        'DISTT.: Fatehabad(HARYANA)'
    ]
    yCoordinate += 5;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(address, center, yCoordinate, {align: 'center'});

    yCoordinate += 10

    return yCoordinate
};

const setInvoiceDetails = (doc, pdfData, yCoordinate) => {
    const center = getDocCenter(doc);
    doc.setFontSize(12);

    doc.rect(10, yCoordinate, center-10, 14)
    doc.rect(center, yCoordinate, center-10, 14)

    // Set Invoice and its Invoice Data
    yCoordinate += 5;
    let xCoordinate = 15;
    doc.setFont('helvetica', 'bold');
    doc.text('Invoice No.', xCoordinate, yCoordinate);
    doc.text(":", xCoordinate + 30, yCoordinate,{align: 'center'});
    doc.setFont('helvetica', 'normal');
    doc.text(`${pdfData.Invoice_Number}`, xCoordinate + 40, yCoordinate,{align: 'left'});

    // Set Date and its Data
    doc.setFont('helvetica', 'bold');
    doc.text('Date', xCoordinate, yCoordinate + 6);
    doc.text(":", xCoordinate + 30, yCoordinate + 6,{align: 'center'});
    doc.setFont('helvetica', 'normal');
    doc.text(`${pdfData.Date}`, xCoordinate + 40, yCoordinate + 6,{align: 'left'});

    // Set Place of Supply and its Data
    xCoordinate = center + 5;
    doc.setFont('helvetica', 'bold');
    doc.text('Place of Supply', xCoordinate , yCoordinate);
    doc.text(":", xCoordinate + 36, yCoordinate,{align: 'center'});
    doc.setFont('helvetica', 'normal');
    doc.text(`${pdfData.Place_Of_Supply}`, xCoordinate + 40, yCoordinate,{align: 'left'});

     // Set Vehicle No and its Date
     doc.setFont('helvetica', 'bold');
     doc.text('Vehicle No.', xCoordinate, yCoordinate + 6);
     doc.text(":", xCoordinate + 36, yCoordinate + 6,{align: 'center'});
     doc.setFont('helvetica', 'normal');
     doc.text(`${pdfData.Vehicle_Number}`, xCoordinate + 40, yCoordinate + 6,{align: 'left'});

    return yCoordinate + 10;
}

const setAddresses = (doc, pdfData, yCoordinate) => {
    const center = getDocCenter(doc);
    doc.setFontSize(12);
    doc.rect(10, yCoordinate, center-10, 35 )
    doc.rect(center, yCoordinate, center-10, 35 )

    // Set Billing Address
    yCoordinate += 5;
    let xCoordinate = 15;
    doc.setFont('helvetica', 'bold');
    doc.text('Billing Address :', xCoordinate, yCoordinate);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`${pdfData.Billing_Address}`, xCoordinate, yCoordinate + 5,{maxWidth: center-20});

    // Set GSTIN No and its Date
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('GSTIN/UIN : ', xCoordinate, yCoordinate + 29);
    doc.text(`${pdfData.GST_Number}`, xCoordinate + 22, yCoordinate + 29,{align: 'left'});

    // Set Billing Address
    xCoordinate = center + 5;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Shipping Address :', xCoordinate, yCoordinate);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`${pdfData.Shipping_Address}`, xCoordinate, yCoordinate + 5,{maxWidth: center-20});

    return yCoordinate + 31;
}

const setInVoiceAmount = (doc, pdfData, yCoordinate) => {
    
    const headers = [['S.No.', 'Description of Goods', 'HSN/SAC\nCode', 'Qty.', 'Unit', 'Price', 'Amount(`)']];
    const data = [  ['1', `${pdfData.Description_Of_Goods} (${pdfData.Pipe_Size})`, `${pdfData.HSN_Number}`, `${pdfData.Quantity}`, 'Kgs.', `${pdfData.Price}`, `${pdfData.Total_Price}`]   ];

    doc.setFontSize(11);
    const cellPadding = 5

    doc.autoTable({
        head: headers,
        body: data,
        startY: yCoordinate,
        theme: 'plain',
        styles: {
          fontSize: 11,
        },
        bodyStyles:{
            minCellHeight: 80
        },
        columnStyles: { 0: {lineColor: [80], lineWidth: 0.2, fontStyle: 'normal',halign: 'center',valign: 'top'},
            1: {lineColor: [80], lineWidth: 0.2, fontStyle: 'normal',halign: 'center',valign: 'top'},
            2: {lineColor: [80], lineWidth: 0.2, fontStyle: 'normal',halign: 'center',valign: 'top'},
            3: {lineColor: [80], lineWidth: 0.2, fontStyle: 'normal',halign: 'center',valign: 'top'},
            4: {lineColor: [80], lineWidth: 0.2, fontStyle: 'normal',halign: 'center',valign: 'top'},
            5: {lineColor: [80], lineWidth: 0.2, fontStyle: 'normal',halign: 'right',valign: 'top'},
            6: {lineColor: [80], lineWidth: 0.2, fontStyle: 'normal',halign: 'right',valign: 'top'}
        },
        headStyles:{
            lineColor: [80],
            lineWidth: 0.2,
            fontStyle: 'bold',
            halign: 'center',
            valign: 'middle'
        },
        margin: 10,
        cellPadding: cellPadding,
        tableLineColor: [80],
        tableLineWidth: 0.2,
      });
      return doc.lastAutoTable;
}

const setGstCalculations = (doc, pdfData, yCoordinate, lastcolumnWidth) =>{
    let dividerCoordinate = doc.internal.pageSize.getWidth()-lastcolumnWidth -10
    doc.rect(10, yCoordinate,  dividerCoordinate-10, 23)
    doc.rect(dividerCoordinate, yCoordinate, lastcolumnWidth, 23)

    const gstCalculationText = ['']
    const gstCalculationValues = ['']
    if(pdfData.GST_Type === 'IGST'){
        gstCalculationText.push(`Add   : IGST\t\t\t@\t ${pdfData.IGST}`)
        gstCalculationValues.push(`${pdfData.IGST_Amount}`)
    } else {
        gstCalculationText.push(`Add   :  CGST\t\t\t@\t ${pdfData.CGST}`)
        gstCalculationText.push(`Add   :  SGST\t\t\t@\t ${pdfData.SGST}`)
        gstCalculationValues.push(`${pdfData.CGST_Amount}`)
        gstCalculationValues.push(`${pdfData.SGST_Amount}`)
    }

    gstCalculationText.push(`Add   :  Rounded Off (${pdfData.Operator_Sign})`)
    gstCalculationValues.push(`${pdfData.Operator_Sign} ${pdfData.Deviation_Value}`)
    yCoordinate += 5
    let xCoordinate = 15;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`${pdfData.Total_Price}`, dividerCoordinate+30, yCoordinate,{align: 'right'})

    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text(gstCalculationText, xCoordinate+85 ,yCoordinate)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'Normal');
    doc.text(gstCalculationValues, dividerCoordinate+30, yCoordinate,{align: 'right'})


    return yCoordinate+18;

}
const setTotalAmount = (doc, pdfData, yCoordinate,lastcolumnWidth) =>{
    let dividerCoordinate =doc.internal.pageSize.getWidth()-lastcolumnWidth -10
    doc.rect(10, yCoordinate, doc.internal.pageSize.getWidth() -20, 24 )
    doc.rect(dividerCoordinate, yCoordinate, lastcolumnWidth, 12)

    const grandTotalText = [`Grand Total\t ${pdfData.Quantity}  Kgs.`]
    const grandTotalValue = [`${pdfData.Net_Bill_Amount}`] 
    yCoordinate += 5
    let xCoordinate = 15;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(grandTotalText, xCoordinate+85 ,yCoordinate)
    doc.text(grandTotalValue, doc.internal.pageSize.getWidth() -12, yCoordinate,{align: 'right'})
    doc.text("AMOUNT IN ENGLISH", xCoordinate ,yCoordinate+15)
    return yCoordinate+20;
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

    const firmSignatureName = ['for M/s. SHREE GANESH PLASTIC PIPE FACTORY']

    const authorisedSignatory = ['Authorised Signatory']

    yCoordinate += 5;
    let xCoordinate = 15;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(termsAndConditionsHeading, xCoordinate, yCoordinate+3);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('E.& O.E.', xCoordinate, yCoordinate + 8, {maxWidth: center-20});

    doc.setFont('helvetica', 'bold');
    doc.text('1.', xCoordinate, yCoordinate + 13, {maxWidth: center-20});
    doc.setFont('helvetica', 'normal');
    doc.text('Goods once sold will not be taken back.', xCoordinate+4, yCoordinate + 13, {maxWidth: center-20});

    doc.setFont('helvetica', 'bold');
    doc.text('2.', xCoordinate, yCoordinate + 18, {maxWidth: center-20});
    doc.setFont('helvetica', 'normal');
    doc.text('Interest @ 18% p.a. will be charged if the payment is not made with in the stipulated time.', xCoordinate+4, yCoordinate +18, {maxWidth: center-20});

    doc.setFont('helvetica', 'bold');
    doc.text('3.', xCoordinate, yCoordinate + 27, {maxWidth: center-20});
    doc.setFont('helvetica', 'normal');
    doc.text('Subject to Ratia,Haryana Jurisdiction only.', xCoordinate+4, yCoordinate + 27, {maxWidth: center-20});

    xCoordinate = center + 5;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(receiverSignature, xCoordinate-4, yCoordinate,{align: 'left'})

    yCoordinate += 10;
    doc.line(xCoordinate - 5, yCoordinate, xCoordinate + center -15, yCoordinate) 
    yCoordinate += 5;
    doc.setFontSize(10);
    doc.text(firmSignatureName, doc.internal.pageSize.getWidth()-12, yCoordinate, {maxWidth: center-20, align: 'right'})
    yCoordinate += 15;
    doc.text(authorisedSignatory, doc.internal.pageSize.getWidth()-12, yCoordinate+3, {maxWidth: center-20, align: 'right'})
}

module.exports = {
    setBillHeader,
    setInvoiceDetails,
    setAddresses,
    setInVoiceAmount,
    setGstCalculations,
    setTotalAmount,
    setFooters
}