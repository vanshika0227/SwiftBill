import React, {useState, useEffect} from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { setBillHeader, setInvoiceDetails, setAddresses, setInVoiceAmount, setGstCalculations, setTotalAmmount, setFooters } from './pdfData';


export default function GeneratePDF(props) {
  const pdfData = props.data[0]
  console.log('pdfdata')
  console.log(pdfData)
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    const doc = new jsPDF();
    let yCoordinate = 10;
    yCoordinate = setBillHeader(doc, pdfData, yCoordinate)
    yCoordinate = setInvoiceDetails(doc, pdfData, yCoordinate);
    yCoordinate = setAddresses(doc, pdfData, yCoordinate);
    let tableCoordinates = setInVoiceAmount(doc, pdfData, yCoordinate);
    yCoordinate = tableCoordinates.finalY
    let lastcolumnWidth = tableCoordinates.columns[tableCoordinates.columns.length-1].width
    yCoordinate = setGstCalculations(doc, pdfData, yCoordinate, lastcolumnWidth);
    yCoordinate = setTotalAmmount(doc, pdfData, yCoordinate);
    yCoordinate = setFooters(doc, pdfData, yCoordinate);
    
    
    console.log('setting invoice ammount');

    // doc.rect(x, y, w, h,(center, yCoordinate, center, yCoordinate+40); // Draw a line


    
    const pdfUrl = doc.output('datauristring');
    setPdfUrl(pdfUrl);
  }, [pdfData]);

  return (
    <div>
      {pdfUrl && <iframe title="Generated Bill" src={pdfUrl} width="100%" height="700px" />}
    </div>
  );
}
