import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import restApi from "./restApi";

const initialCleintState = {
  clientData: [],
  headers: [],
  clientNames:[] ,
  billNumber: '',
  selectedClientName: '',
  selectedClientDetails: {
    GST_number: '',
    PlaceOfSupply: '',
    GST_Type: '',
    Billing_Address: '',
    Shipping_Address: ''
  },
  isUpdateClient: false
}

const updateClienState = {

}

export const updateClientsData = createAsyncThunk('update/client',
  async (newClientData) => {
    let response =  await restApi.post("client", newClientData)
    return response.data;
  }
);

export const fetchClientsData = createAsyncThunk('fetch/client',
  async () => {
    let response = await restApi.get("client");
    return response.data;
  }
);

const clientSlice = createSlice({
  name: "client",
  initialState: initialCleintState,
  reducers: {
    isUpdateClient: (state, actions) => {
      state.isUpdateClient = actions.payload
    },
    setSelectedClientDetails: (state, actions) => {
      state.selectedClientName = (actions.payload === null ? '' : actions.payload)
      if(!state.isUpdateClient){
        state.selectedClientDetails = getSelectedClientDetails(state.selectedClientName, state.clientData, state.headers)
      }
    },
    setclientDetails: (state, actions) => {
      state.clientDetails = actions.payload
    },
    setbillNumber: (state, actions) => {
      state.billNumber = actions.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchClientsData.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchClientsData.fulfilled, (state, actions) => {
      state.clientData = actions.payload
      state.headers = actions.payload.shift()
      state.clientNames = getClientNames(actions.payload)
      state.loading = false
    })
    builder.addCase(fetchClientsData.rejected, (state, actions) => {
      state.loading = false
      state.error = actions.error.message
      console.log(state.error)
    })
  },
})

const updateClientSlice = createSlice({
  name: "updateClient",
  initialState: updateClienState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(updateClientsData.pending, (state) => {
      state.loading = true
    })
    builder.addCase(updateClientsData.fulfilled, (state, actions) => {
      state.loading = false
    })
    builder.addCase(updateClientsData.rejected, (state, actions) => {
      state.loading = false
      state.error = actions.error.message
      console.log(state.error)
    })
  },
})

const getClientNames = (clientNames) => {
  let registerClientList = [];
  clientNames.forEach((client) => {
    registerClientList.push(client[0]);
  })

  return registerClientList;

}

const getSelectedClientDetails = (clientName, clientData, headers) => {
  let selectedClientData = {
    GST_number: '',
    PlaceOfSupply: '',
    GST_Type: '',
    Billing_Address: '',
    Shipping_Address: ''
  }
  clientData.forEach(client => {
    if(client.includes(clientName)){
      selectedClientData = {
        GST_number: client[headers.indexOf('GST Number')],
        PlaceOfSupply: client[headers.indexOf('Place of Supply')],
        GST_Type: client[headers.indexOf('GST Type')],
        Billing_Address: client[headers.indexOf('Billing Address')],
        Shipping_Address: client[headers.indexOf('Shipping Address')],
      }
      return selectedClientData
    }
  });

  return selectedClientData;
}

export const {
  isUpdateClient,
  setSelectedClientDetails,
  setclientDetails,
  setbillNumber,
  updateClientData
} = clientSlice.actions

export const {updateActions} = updateClientSlice.actions

const rootReducer = {
  allClients: clientSlice.reducer,
  updateClient: updateClientSlice.reducer,
};

export default rootReducer
