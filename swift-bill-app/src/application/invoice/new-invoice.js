import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Checkbox from '@mui/material/Checkbox';
import { useSelector, useDispatch } from "react-redux"
import { fetchClientsData, isUpdateClient, setSelectedClientDetails, updateClientsData } from '../../redux/clientData';
import GeneratePDF from '../generatePdf/GeneratePDF';
import { calculateBill } from './utils/priceCalculate';
import "react-datepicker/dist/react-datepicker.css";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { getDateFormat } from './utils/utils';




function ClientDropDown() {
  const dispatch = useDispatch();
  const clientDetails = useSelector((state) => state.allClients.clientNames)
  const [saveClient, setSaveClient] = useState(false);
  const [selectedClientName, setSelectedClientName] = useState('');
  const [newClientName, setNewClientName] = useState('');

  const handleSelectedClientName = (event, value) => {
    setSaveClient(false);
    
    if(!clientDetails.includes(value) && value !== null){
      return handleNewClientName(event, value);
    }
    setSelectedClientName(value);
    dispatch(setSelectedClientDetails(value));
  };

  const handleNewClientName = (event, value) => {
    setSaveClient(true);
    setNewClientName(value);
    dispatch(setSelectedClientDetails(value));
  };

  const handleCheckboxChange = (event) => {
    console.log('inside change');
    dispatch(isUpdateClient(true));
  };

    return (
      <div>
        <Autocomplete
        freeSolo
        disablePortal
        id="combo-box-demo"
        options={clientDetails}
        onOpen={() => {dispatch(fetchClientsData())}}
        sx={{ width: '100%' }}
        renderInput={(params) => <TextField {...params} InputProps={{...params.InputProps, type: 'search',}} label="Select Client" required />}
        value={selectedClientName}
        onChange={handleSelectedClientName}
        inputValue={newClientName}
        onInputChange={handleNewClientName}
        />
        {saveClient && (
          <FormControlLabel
            control={<Checkbox />}
            label="Save Client"
            onChange={handleCheckboxChange}
          />
        )}
      </div>
    );
}

const isNumberUpto2Decimal = (value) => {
  if(value.toString().includes('.')){
    if((value.toString().length - value.toString().indexOf('.') -1) >2){
      console.log('error found');
      return true
    }
  } 

  return false
}

const isValidationSuccess = (error) => {
  if(Object.values(error).includes(true)){
    return false;
  }

  return true;
}

const New = () => {
  console.log('using slectore')
  const dispatch = useDispatch();
  const selectedClientName = useSelector((state) => state.allClients.selectedClientName)
  const selectedClientDetails = useSelector((state) => state.allClients.selectedClientDetails)
  const isUpdateClient = useSelector((state) => state.allClients.isUpdateClient)
  console.log(selectedClientDetails);
  const [GSTNumber, setGSTnumber] = useState('');
  const [placeOfSupply, setPlaceOfSupply] = useState('');
  const [GST_Type, setGSTtype] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingSameAsBilling, setShippingSameAsBilling] = useState(false);
  const [descriptionOfGoods, setDescription] = useState('');
  const [pipeSize, setPipeSize] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [hsnNumber, setHsnNumber] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [date, setDate] = useState(new Date());
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [pdfInputs, setPdfInputs] = useState([{}])
  const [error, setError] = useState({
    gstError: false,
    quantityError: false,
    priceError: false
  })

  const formOutput = [{
    Client_Name: selectedClientName,
    GST_Number: GSTNumber,
    Place_Of_Supply: placeOfSupply,
    GST_Type: GST_Type,
    Billing_Address: billingAddress,
    Shipping_Address: shippingAddress,
    Pipe_Size: pipeSize,
    Price: price,
    Quantity: quantity,
    Vehicle_Number: vehicleNumber,
    HSN_Number: hsnNumber,
    Invoice_Number: invoiceNumber,
    Date: date,
    Description_Of_Goods: descriptionOfGoods
  }]

  useEffect(() => {
    setGSTnumber(selectedClientDetails.GST_number);
    setPlaceOfSupply(selectedClientDetails.PlaceOfSupply);
    setGSTtype(selectedClientDetails.GST_Type);
    setBillingAddress(selectedClientDetails.Billing_Address);
  }, [selectedClientDetails]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if(isUpdateClient){
      console.log('update client required')
      let newClientData = {
        clientName: selectedClientName,
        GST_number: GSTNumber,
        PlaceOfSupply: placeOfSupply,
        GST_Type: GST_Type,
        Billing_Address: billingAddress
      }
      dispatch(updateClientsData(newClientData));
    }
    let billValues = calculateBill(formOutput[0]);
    let allValues = {
      ...billValues,
      ...formOutput[0]
    }

    allValues.Date = getDateFormat(allValues.Date);
    setPdfInputs([allValues])
    validateInputs(allValues);
    setFormSubmitted(isValidationSuccess(error));
    
    
  };

  const validateInputs = (value) => {
    setError((error) => ({ ...error, gstError: (value.GST_Number.length !== 15 && /^[A-Za-z0-9]*$/.test(value.GST_Number))}))
    setError((error) => ({ ...error, priceError: isNumberUpto2Decimal(value.Price)}))
    setError((error) => ({ ...error, quantityError: isNumberUpto2Decimal(value.Quantity)}))
  }

  const handleShippingSameAsBillingChange = (event) => {
    setShippingAddress(billingAddress);
    setShippingSameAsBilling(event.target.checked);
  };

  return (
    <div style={{paddingLeft: '2rem', paddingTop: '2rem', padding: '2rem'}}>
      {formSubmitted ? <GeneratePDF data={pdfInputs}/> : 
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <ClientDropDown/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
              error={error.gstError}
              helperText="Enter 15 character value without special characters"
              label="GST Number"
              value={GSTNumber}
              required={true}
              disabled={selectedClientDetails.GST_number !== ''}
              onChange={(event) => setGSTnumber(event.target.value)}
              fullWidth
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Place of supply"
            value={placeOfSupply}
            required={true}
            disabled={selectedClientDetails.PlaceOfSupply !== ''}
            onChange={(event) => setPlaceOfSupply(event.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">GST Type</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={GST_Type}
              onChange={(event) => setGSTtype(event.target.value)}
              
            >
              <FormControlLabel value="IGST" control={<Radio />} label="IGST" disabled={selectedClientDetails.GST_Type !== ''}/>
              <FormControlLabel value="CGST_SGST" control={<Radio />} label="CGST+SGST" disabled={selectedClientDetails.GST_Type !== ''}/>
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Billing Address"
            value={billingAddress}
            onChange={(event) => setBillingAddress(event.target.value)}
            fullWidth
            multiline
            required
            rows={3}
            disabled={selectedClientDetails.Billing_Address !== ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
            {shippingSameAsBilling ? (
                <TextField
                label="Shipping Address"
                fullWidth
                multiline
                required
                rows={3}
                value={billingAddress}
                disabled
                />
            ) : (
                <TextField
                label="Shipping Address"
                fullWidth
                multiline
                required
                rows={3}
                value={shippingAddress}
                onChange={(event) => setShippingAddress(event.target.value)}
                />
            )}
          <FormControlLabel
            control={
            <Checkbox
                checked={shippingSameAsBilling}
                onChange={handleShippingSameAsBillingChange}
                color="primary"
            />
            }
            label="Shipping address same as Billing address"
           />
        </Grid>
        <Grid item xs={12} sm={12}>
            <Divider variant= 'middle'></Divider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
              label="Invoice Number"
              value={invoiceNumber}
              required={true}
              onChange={(event) => setInvoiceNumber(event.target.value)}
              fullWidth
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                format="dd-MM-yyyy"
                inputVariant="outlined"
              />
            </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Vehicle Number"
            value={vehicleNumber}
            required={true}
            onChange={(event) => setVehicleNumber(event.target.value)}
            fullWidth
            inputProps={{ style: { textTransform: "uppercase" } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="HSN Number"
            type="number"
            value={hsnNumber}
            required={true}
            onChange={(event) => setHsnNumber(event.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
            <Divider variant= 'middle'></Divider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Description of Goods"
            value={descriptionOfGoods}
            required={true}
            onChange={(event) => setDescription(event.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Pipe Size (inch)</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={pipeSize}
            label="Pipe Size (inch)"
            onChange={(event) => setPipeSize(event.target.value)}
            required={true}
          >
            <MenuItem value={10}>2"</MenuItem>
            <MenuItem value={20}>3"</MenuItem>
            <MenuItem value={30}>4"</MenuItem>
            <MenuItem value={40}>5"</MenuItem>
            <MenuItem value={50}>6"</MenuItem>
            <MenuItem value={60}>7"</MenuItem>
            <MenuItem value={70}>8"</MenuItem>
            <MenuItem value={80}>9"</MenuItem>
            <MenuItem value={90}>10"</MenuItem>
            <MenuItem value={100}>11"</MenuItem>
            <MenuItem value={110}>12"</MenuItem>
          </Select>
        </FormControl>
          {/* <TextField
            label="Pipe Size (inch)"
            value={pipeSize}
            required={true}
            onChange={(event) => setPipeSize(event.target.value)}
            fullWidth
          /> */}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={error.quantityError}
            helperText="Quantity upto 2 decimal places only"
            label="Quantity"
            type="number"
            value={quantity}
            required={true}
            onChange={(event) => setQuantity(event.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={error.priceError}
            helperText="Price upto 2 decimal places only"
            label="Price"
            type="number"
            value={price}
            required={true}
            onChange={(event) => setPrice(event.target.value)}
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
        <Grid item xs={12} style={{textAlign: 'center'}}>
          <Button type="submit" variant="contained" color="primary" size="large">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
}
    </div>
  );
};

export default New;