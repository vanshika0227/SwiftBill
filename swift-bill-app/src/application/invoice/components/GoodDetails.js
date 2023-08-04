import React, { useState, useEffect } from 'react';
import { TextField, Grid } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { quantityUnit } from './../utils/utils';
import { useSelector } from "react-redux";



const GoodDetails = (props) => {

  const selectedClientDetails = useSelector((state) => state.allClients.selectedClientDetails)
  const [descriptionOfGoods, setDescription] = useState('');
  const [pipeSize, setPipeSize] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [units, setUnits] = useState('Kgs');
  const [hsnNumber, setHsnNumber] = useState('');

  useEffect(() => {
    setDescription('');
    setPipeSize('');
    setPrice('');
    setQuantity('');
    setUnits('Kgs');
    setHsnNumber('');
  }, [selectedClientDetails]);

  const formOutput = [{
    Pipe_Size: pipeSize,
    Price: price,
    Quantity: quantity,
    Units: units,
    HSN_Number: hsnNumber,
    Description_Of_Goods: descriptionOfGoods
  }]

  const handleChange = (event) => {
    let value = event[0];
    setDescription(value.Description_Of_Goods);
    setPipeSize(value.Pipe_Size);
    setPrice(value.Price);
    setQuantity(value.quantity);
    setUnits(value.Units);
    setHsnNumber(value.HSN_Number);
    props.handleGoodDetails(formOutput)
  }
 

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
          <TextField
            label="Description of Goods"
            value={descriptionOfGoods}
            required={true}
            onChange={(event) => handleChange([{...formOutput, Description_Of_Goods: event.target.value}])}
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sm={6}></Grid>
        <Grid item xs={6} sm={3}>
          <TextField
              label="HSN Number"
              type="number"
              value={hsnNumber}
              required={true}
              onChange={(event) => handleChange([{...formOutput, HSN_Number: event.target.value}])}
              fullWidth
            />
        </Grid>
        <Grid item xs={6} sm={3}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Pipe Size (inch)</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={pipeSize}
            label="Pipe Size (inch)"
            onChange={(event) => handleChange(event.target.value === "-" ? [{...formOutput, Pipe_Size: ''}]: [{...formOutput, Pipe_Size: event.target.value}])}
          >
            <MenuItem value={"-"}>N/A</MenuItem>
            <MenuItem value={"(2\")"}>2"</MenuItem>
            <MenuItem value={"(3\")"}>3"</MenuItem>
            <MenuItem value={"(4\")"}>4"</MenuItem>
            <MenuItem value={"(5\")"}>5"</MenuItem>
            <MenuItem value={"(6\")"}>6"</MenuItem>
            <MenuItem value={"(7\")"}>7"</MenuItem>
            <MenuItem value={"(8\")"}>8"</MenuItem>
            <MenuItem value={"(9\")"}>9"</MenuItem>
            <MenuItem value={"(10\")"}>10"</MenuItem>
            <MenuItem value={"(11\")"}>11"</MenuItem>
            <MenuItem value={"(12\")"}>12"</MenuItem>
          </Select>
        </FormControl>
        </Grid>
        <Grid item xs={4.8} sm={2}>
          <TextField
            error={props.quantityError}
            helperText="Quantity upto 2 decimal places"
            label="Quantity"
            type="number"
            value={quantity}
            required={true}
            onChange={(event) => handleChange([{...formOutput, Quantity: event.target.value}])}
            fullWidth
          />
        </Grid>
        <Grid item xs={1.2} sm={1}>
          <TextField
              required
              label="Units"
              fullWidth
              select
              value={units}
              onChange={(event) => handleChange([{...formOutput, Units: event.target.value}])}
          >
            {quantityUnit.map((option) => (
            <MenuItem key={option.value} value={option.label}>
              {option.label}
            </MenuItem>
          ))}

          </TextField>
        </Grid>
        <Grid item xs={3} sm={3}>
          <TextField
            error={props.priceError}
            helperText="Price upto 2 decimal places only"
            label="Price"
            type="number"
            value={price}
            required={true}
            onChange={(event) => handleChange([{...formOutput, Price: event.target.value}])}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CurrencyRupeeIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
    </Grid>
  );
}

  export default GoodDetails;