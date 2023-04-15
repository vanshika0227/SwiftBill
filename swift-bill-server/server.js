import readXlsxFile from 'read-excel-file/node';
import writeXlsxFile from 'write-excel-file/node';
import path from 'path';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const port = 8000;
let filename = path.join(process.cwd(), 'dataBase', 'varis.xlsx');

app.get('/client', async (req, res) => {
    let content = await readXlsxFile(filename)
    res.send(content);
});

app.post('/client', async (req, res) => {
  let content = await readXlsxFile(filename)
  let sheetData = []
  content.forEach(row => {
    let rowData = []
    row.forEach((cell) => {
      rowData.push({
          value: cell.toString(),
          type: String
        });
    });
    sheetData.push(rowData);
  });
  console.log(req.body);
  console.log(JSON.stringify(req.body));
  sheetData.push([
    {
      value: req.body.clientName.toString(),
      type: String
    },
    {
      value: req.body.GST_number.toString(),
      type: String
    },
    {
      value: req.body.PlaceOfSupply.toString(),
      type: String
    },
    {
      value: req.body.GST_Type.toString(),
      type: String
    },
    {
      value: req.body.Billing_Address.toString(),
      type: String
    },
    {
      value: req.body.Shipping_Address.toString(),
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
