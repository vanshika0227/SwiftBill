import readXlsxFile from 'read-excel-file/node';
import writeXlsxFile from 'write-excel-file/node';
import path from 'path';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const port = 8000;
let filename = path.join(process.cwd(), 'dataBase', 'clientDetails.xlsx');

app.get('/client', async (req, res) => {
    let content = await readXlsxFile(filename)
    res.send(content);
});

const getValue = (value) => {
  if(value !== null){
    return value.toString();
  }

  return value;
}

app.post('/client', async (req, res) => {
  let content = await readXlsxFile(filename)
  let sheetData = []
  content.forEach(row => {
    let rowData = []
    row.forEach((cell) => {
      rowData.push({
          value: getValue(cell),
          type: String
        });
    });
    sheetData.push(rowData);
  });
  console.log(req.body);
  console.log(JSON.stringify(req.body));
  sheetData.push([
    {
      value: getValue(req.body.clientName),
      type: String
    },
    {
      value: getValue(req.body.GST_number),
      type: String
    },
    {
      value: getValue(req.body.PlaceOfSupply),
      type: String
    },
    {
      value: getValue(req.body.GST_Type),
      type: String
    },
    {
      value: getValue(req.body.Billing_Address),
      type: String
    }
  ])
  try {
    await writeXlsxFile(sheetData, {filePath: filename})
    res.status(200).send()
  } catch(err){
    console.log(err);
    res.status(400).send(err);
  }
  
});

app.get('/bills', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
