import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getDateFormat, getCommaSeparatedAmount,getAmountInWords } from './utils/utils';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import GoodDetails from './components/GoodDetails';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.h4,
  color: theme.palette.primary.dark,
  padding: theme.spacing(1)
}));

const placeOfSupplyValues = ['HARYANA	(06)', 'JAMMU & KASHMIR (01)', 'HIMACHAL PRADESH	(02)', 'PUNJAB	(03)', 'CHANDIGARH	(04)',
    'UTTARAKHAND	(05)', 'DELHI	(07)', 'RAJASTHAN	(08)', 'UTTAR PRADESH	(09)', 'BIHAR	(10)',
    'SIKKIM	(11)', 'ARUNACHAL PRADESH	(12)', 'NAGALAND	(13)', 'MANIPUR	(14)', 'MIZORAM	(15)', 'TRIPURA	(16)',
    'MEGHALAYA	(17)', 'ASSAM	(18)', 'WEST BENGAL	(19)', 'JHARKHAND	(20)', 'ODISHA	(21)', 'CHATTISGARH	(22)',
    'MADHYA PRADESH	(23)', 'GUJARAT	(24)', 'DADRA AND NAGAR HAVELI AND DAMAN AND DIU	(26)', 'MAHARASHTRA	(27)',
    'ANDHRA PRADESH	(28)', 'KARNATAKA	(29)', 'GOA	(30)', 'LAKSHADWEEP	(31)', 'KERALA	(32)', 'TAMIL NADU	(33)',
    'PUDUCHERRY	(34)', 'ANDAMAN AND NICOBAR ISLANDS	(35)', 'TELANGANA	(36)', 'ANDHRA PRADESH	(37)', 'LADAKH 	(38)',
    'OTHER TERRITORY	(97)', 'CENTRE JURISDICTION	(99)'] ;

function ClientDropDown(props) {
  const dispatch = useDispatch();
  const clientDetails = useSelector((state) => state.allClients.clientNames)
  const [saveClient, setSaveClient] = useState(false);
  const [selectedClientName, setSelectedClientName] = useState(props.clientName);
  const [newClientName, setNewClientName] = useState(props.clientName);

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
      return true
    }
  } 

  return false
}

const New = () => {
  const dispatch = useDispatch();
  const selectedClientName = useSelector((state) => state.allClients.selectedClientName)
  const selectedClientDetails = useSelector((state) => state.allClients.selectedClientDetails)
  const isUpdateClient = useSelector((state) => state.allClients.isUpdateClient)
  const [GSTNumber, setGSTnumber] = useState('');
  const [placeOfSupply, setPlaceOfSupply] = useState('');
  const [GST_Type, setGSTtype] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingSameAsBilling, setShippingSameAsBilling] = useState(false);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [date, setDate] = useState(new Date());
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [pdfInputs, setPdfInputs] = useState([{}]);
  const [goodDetails, setGoodDetails] = useState([{
    Pipe_Size: '',
    Price: '',
    Quantity: '',
    Units:'Kgs',
    HSN_Number: '',
    Description_Of_Goods: ''
  }]);

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
    Vehicle_Number: vehicleNumber,
    Invoice_Number: invoiceNumber,
    Date: date,
    Pipe_Size: goodDetails.pipeSize,
    Price: goodDetails.price,
    Quantity: goodDetails.quantity,
    Units: goodDetails.units,
    HSN_Number: goodDetails.hsnNumber,
    Description_Of_Goods: goodDetails.descriptionOfGoods
  }]

  useEffect(() => {
    setGSTnumber(selectedClientDetails.GST_number);
    setPlaceOfSupply(selectedClientDetails.PlaceOfSupply);
    setGSTtype(selectedClientDetails.GST_Type);
    setBillingAddress(selectedClientDetails.Billing_Address);
    setShippingSameAsBilling(false);
    setShippingAddress('');
    setVehicleNumber('');
    setInvoiceNumber('');
    setDate(new Date());
    setError({
      gstError: false,
      quantityError: false,
      priceError: false
      });
      setFormSubmitted(false);
  }, [selectedClientDetails]);

  const isValidationSuccess = () => {
    if(Object.values(error).includes(true)){
      return false;
    }
    
    if(isUpdateClient){
      let newClientData = {
        clientName: selectedClientName,
        GST_number: GSTNumber,
        PlaceOfSupply: placeOfSupply,
        GST_Type: GST_Type,
        Billing_Address: billingAddress
      }
      dispatch(updateClientsData(newClientData));
    }
    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    validateInputs(formOutput[0]);
    let billValues = calculateBill(formOutput[0]);
    let allValues = {
      ...billValues,
      ...formOutput[0]
    }

    allValues.Date = getDateFormat(allValues.Date);
    allValues.Amount_Words = getAmountInWords(allValues.Net_Bill_Amount);
    allValues.Net_Bill_Amount = getCommaSeparatedAmount(allValues.Net_Bill_Amount);
    allValues.Total_Price = getCommaSeparatedAmount(allValues.Total_Price);
    allValues.Price = getCommaSeparatedAmount(allValues.Price);
    allValues.IGST_Amount = getCommaSeparatedAmount(allValues.IGST_Amount);
    allValues.CGST_Amount = getCommaSeparatedAmount(allValues.CGST_Amount);
    allValues.SGST_Amount = getCommaSeparatedAmount(allValues.SGST_Amount);
    setPdfInputs([allValues])   
    setFormSubmitted(true);
  };

  const validateInputs = (value) => {
    setError((error) => ({ ...error, gstError: (!( value.GST_Number === 'URP' || (value.GST_Number.length === 15 && /^[A-Za-z0-9]*$/.test(value.GST_Number))))}))
    setError((error) => ({ ...error, priceError: isNumberUpto2Decimal(value.Price)}))
    setError((error) => ({ ...error, quantityError: isNumberUpto2Decimal(value.Quantity)}))
      
  }

  const handleShippingSameAsBillingChange = (event) => {
    setShippingAddress(billingAddress);
    setShippingSameAsBilling(event.target.checked);
  };

  const handlePlaceOfSupplyChange = (event, value) => {
    setPlaceOfSupply(value);
    value.toLowerCase().includes('haryana')? setGSTtype('CGST_SGST') : setGSTtype('IGST');
  }

  return (
    <div style={{paddingLeft: '2rem', paddingTop: '2rem', padding: '2rem'}}>
      {formSubmitted && isValidationSuccess(error) ? <GeneratePDF data={pdfInputs}/> : 
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
        <Div variant="h4" component="h4"> Client Details </Div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ClientDropDown clientName={selectedClientName}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
              error={error.gstError}
              helperText="Enter URP or 15 character value without special characters"
              label="GST Number"
              value={GSTNumber}
              required={true}
              disabled={selectedClientDetails.GST_number !== ''}
              onChange={(event) => { setGSTnumber(event.target.value.toUpperCase())}}
              fullWidth
              inputProps={{ style: { textTransform: "uppercase" }, maxLength: 15 }}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
             disabled={selectedClientDetails.PlaceOfSupply!==''}
             disablePortal
             id="combo-box-demo"
             options={placeOfSupplyValues}
             fullWidth
             renderInput={(params) => <TextField {...params} InputProps={{...params.InputProps, type: 'search'}} label="Place of supply" required />}
             value={placeOfSupply}
             onChange={handlePlaceOfSupplyChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required>
            <FormLabel id="demo-row-radio-buttons-group-label">GST Type</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={GST_Type}
            >
              <FormControlLabel value="IGST" control={<Radio />} label="IGST" disabled/>
              <FormControlLabel value="CGST_SGST" control={<Radio />} label="CGST+SGST" disabled/>
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
          <Div variant="h4" component="h4">Invoice Details </Div>
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
            onChange={(event) => setVehicleNumber(event.target.value.toUpperCase())}
            fullWidth
            inputProps={{ style: { textTransform: "uppercase" }, maxLength: 15 }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Div variant="h4" component="h4">Goods Details </Div>
        </Grid>
        <Grid item xs={12} sm={12}>
          <GoodDetails priceError={error.priceError} quantityError={error.quantityError} handleGoodDetails={(data) => setGoodDetails(data)}></GoodDetails>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button variant="outlined" size="large" startIcon={<AddIcon/>}  onClick={() => {}}>
            Add a row
          </Button>
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
