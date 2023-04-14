import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import restApi from "./restApi";



const initialState = {
  clientDetails:[] ,
  billNumber: '',
  clientName: ''
}

export const fetchClientDetails = createAsyncThunk('fetch/client',
async () => {
  let response = await restApi.get("client");
  return response.data;
}
)

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClientName: (state, actions) => {
      state.clientName = actions.payload
    },
    setclientDetails: (state, actions) => {
      state.clientDetails = actions.payload
    },
    setbillNumber: (state, actions) => {
      state.billNumber = actions.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchClientDetails.pending, (state) => {
      state.loading = true
      console.log(state);
    })
    builder.addCase(fetchClientDetails.fulfilled, (state, actions) => {
      state.builds = actions.payload
      state.clientDetails = getClientNames(actions.payload)
      state.loading = false
    })
    builder.addCase(fetchClientDetails.rejected, (state, actions) => {
      state.loading = false
      state.error = actions.error.message
      console.log(state.error)
    })
  },
})

const getClientHeaders = (clientDetails) => {
  let headers = clientDetails[0]
  clientDetails.shift()

  return headers;
};

const getClientNames = (clientDetails) => {
  let headers = getClientHeaders(clientDetails);
  clientDetails.forEach((client, index) => {
    if(client[headers.indexOf('Type')] === 'temprory'){
      if(parseInt(client[headers.indexOf('BillsGenerated')]) >=1){
        clientDetails.splice(index, 1);
      }
    }
  });

  let registerClientList = [];
  clientDetails.forEach((client) => {
    registerClientList.push(client[0]);
  })

  return registerClientList;

}

export const getClientName = (state) => state.allClients.clientDetails


export const {
    setClientName,
    setclientDetails,
    setbillNumber
} = clientSlice.actions

export default clientSlice.reducer
