import readXlsxFile from 'read-excel-file/node';
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

app.get('/bills', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
