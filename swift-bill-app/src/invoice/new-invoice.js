import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const registeredClients =  () => {

    // Add logic to read clients for CSV file
    let registerClientList = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
        { label: 'The Dark Knight', year: 2008 },
        { label: '12 Angry Men', year: 1957 },
        { label: "Schindler's List", year: 1993 },
        { label: 'Pulp Fiction', year: 1994 }
    ]

  return registerClientList;
}
  
function ClientDropDown(props) {
  const [inputValue, setInputValue] = useState('');
    return (
        <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={registeredClients()}
        sx={{ width: '100%' }}
        renderInput={(params) => <TextField {...params} label="client" />}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
        />
    );
}

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.info.light,
  padding: theme.spacing(2),
  borderRadius: '10px'
}));

function TypographyTheme() {
  return <Div>{"Select Client"}</Div>;
}


const New = () => {
  const [clientName, setClientName] = useState('');
  const [GSTnumber, setGSTnumber] = useState('');
  const [IGST, setIGST] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const [shippingSameAsBilling, setShippingSameAsBilling] = useState(false);
  const [billingAddress, setBillingAddress] = useState('');

  const handleShippingSameAsBillingChange = (event) => {
    setShippingSameAsBilling(event.target.checked);
  };

  const handleBillingAddressChange = (event) => {
    setBillingAddress(event.target.value);
  };


  return (
    <div style={{paddingLeft: '2rem', paddingTop: '2rem', padding: '2rem'}}>
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
            <TypographyTheme/>
        </Grid>
        <Grid item xs={12} sm={6}>
            <ClientDropDown />
        </Grid>
        <Grid item xs={12} sm={12}>
            <Divider variant= 'middle'></Divider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Client Name"
            value={clientName}
            onChange={(event) => setClientName(event.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="GST Number"
            value={GSTnumber}
            onChange={(event) => setGSTnumber(event.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Place of supply"
            value={clientName}
            onChange={(event) => setClientName(event.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="IGST"
            value={IGST}
            onChange={(event) => setIGST(event.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12}>
            <Divider variant= 'middle'></Divider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Billing Address"
            value={clientName}
            onChange={(event) => setClientName(event.target.value)}
            fullWidth
            multiline
            rows={3}
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
                value={billingAddress}
                onChange={handleBillingAddressChange}
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
        <Grid item xs={12} style={{textAlign: 'center'}}>
          <Button type="submit" variant="contained" color="primary" size="large">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
    </div>
  );
};

export default New;
