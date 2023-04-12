import React from "react"
import "./edit-invoice.css"
import { Grid, Container, Box } from "@mui/material"
import { Button, Menu, MenuItem } from '@mui/material';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import PropTypes from 'prop-types';

const registeredClients = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 }
]

function ClientDropDown() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={registeredClients}
      sx={{ width: '100%' }}
      renderInput={(params) => <TextField {...params} label="client" />}
    />
  );
}

function GridTemplateAreas() {
  return (
    <Box
      sx={{
        width: '100%',
        color: '#fff',
        border: '1px dashed grey',
        '& > .MuiBox-root > .MuiBox-root': {
          p: 2,
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
        },
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          gridTemplateRows: 'auto',
          gridTemplateAreas: `"select . client client"
          "detail1 detail2 detail3 detail4"
          "address address1 address2 address3"
        `,
        }}
      >
        
        <Box sx={{ gridArea: 'select', bgcolor: 'primary.main' }}>Select Client</Box>
        <Box sx={{ gridArea: 'client', bgcolor: 'primary.main' }}><ClientDropDown></ClientDropDown></Box>
        <Box sx={{ gridArea: 'detail1', bgcolor: 'secondary.main' }}>Client Name</Box>
        <Box sx={{ gridArea: 'detail2', bgcolor: 'secondary.main' }}>Client GST Number</Box>
        <Box sx={{ gridArea: 'detail3', bgcolor: 'secondary.main' }}>Place of supply</Box>
        <Box sx={{ gridArea: 'detail4', bgcolor: 'secondary.main' }}>IGST</Box>
        <Box sx={{ gridArea: 'address', bgcolor: 'warning.light' }}>Billing Address</Box>
        <Box sx={{ gridArea: 'address1', bgcolor: 'warning.light' }}>Blank</Box>
        <Box sx={{ gridArea: 'address2', bgcolor: 'warning.light' }}>Shipping Address</Box>
        <Box sx={{ gridArea: 'address3', bgcolor: 'warning.light' }}>Blank</Box>
       
      </Box>
    </Box>
  );
}

const Edit = () => {
  return(
    <div style={{paddingLeft: '0.5rem', paddingTop: '0.5rem', padding: '0.5rem'}}>
      <GridTemplateAreas></GridTemplateAreas>
    </div>
  )
}
// const Edit = () => {
//     return(
//             <Grid container sx={{ padding: "0.5rem" }}>
//                 <Grid container xs={12} md={12}>
//                   <Box sx={{ p: 2, border: '1px dashed grey' }}>
//                     <Grid item xs={1} md={1}>
//                       <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
//                         <Button>Select Client</Button>
//                       </Box>
//                     </Grid>
//                     <Grid item xs={11} md={11}>
//                         <ClientDropDown></ClientDropDown>
//                     </Grid>
//                   </Box>
//                 </Grid>
//                 <Divider/>
//                 <Grid container spacing={2}>
//                     <Grid item xs={6} md={6}>
//                         <div>Client Name</div>
//                     </Grid>
//                     <Grid item xs={6} md={6}>
//                         <div>Client GST Number</div>
//                     </Grid>
//                     <Grid item xs={6} md={6}>
//                         <div>Place of supply</div>
//                     </Grid>
//                     <Grid item xs={6} md={6}>
//                         <div>IGST</div>
//                     </Grid>
//                 </Grid>
//                 <Divider/>
//                 <Grid container spacing={3}>
//                     <Grid item xs={6} md={6}>
//                         <div>Billing Address</div>
//                     </Grid>
//                     <Grid item xs={6} md={6}>
//                         <div>shipping Address</div>
//                     </Grid>
//                     <Grid item xs={6} md={6}>
//                         <div>Blank line</div>
//                     </Grid>
//                     <Grid item xs={6} md={6}>
//                         <div>Blank line</div>
//                     </Grid>
//                     <Grid item xs={6} md={6}>
//                         <div>Blank line</div>
//                     </Grid>
//                 </Grid>
//                 <Divider/>
//             </Grid>
//     )
// };

export default Edit;