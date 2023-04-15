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
import { fetchClientsData, isUpdateClient, setSelectedClientDetails, updateClientsData } from '../redux/clientData';
import GeneratePDF from '../generatePdf/GeneratePDF';
import { calculateBill } from '../generatePdf/priceCalculate';

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
  const [date, setDate] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [pdfInputs, setPdfInputs] = useState([{}])

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
    setPdfInputs([allValues])
    console.log('input received');
    console.log(pdfInputs)
    setFormSubmitted(true);
    
  };

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
          <TextField
              label="Invoice Number"
              value={invoiceNumber}
              required={true}
              onChange={(event) => setInvoiceNumber(event.target.value)}
              fullWidth
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Date"
            value={GSTNumber}
            required={true}
            onChange={(event) => setGSTnumber(event.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <ClientDropDown/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
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
        <Grid item xs={12} sm={12}>
            <Divider variant= 'middle'></Divider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Billing Address"
            value={billingAddress}
            onChange={(event) => setBillingAddress(event.target.value)}
            fullWidth
            multiline
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
                rows={3}
                value={billingAddress}
                disabled
                />
            ) : (
                <TextField
                label="Shipping Address"
                fullWidth
                multiline
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
            label="Description of Goods"
            value={descriptionOfGoods}
            required={true}
            onChange={(event) => setDescription(event.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Pipe Size"
            value={pipeSize}
            required={true}
            onChange={(event) => setPipeSize(event.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Quantity"
            value={quantity}
            required={true}
            onChange={(event) => setQuantity(event.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Price"
            value={price}
            required={true}
            onChange={(event) => setPrice(event.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Vehicle Number"
            value={vehicleNumber}
            required={true}
            onChange={(event) => setVehicleNumber(event.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="HSN Number"
            value={hsnNumber}
            required={true}
            onChange={(event) => setHsnNumber(event.target.value)}
            fullWidth
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
