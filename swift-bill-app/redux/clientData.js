import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  clientDetails:[] ,
  billNumber: '',
  clientName: ''
}

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
  }
})

export const getClientName = (state) => state.allClients.clientName
export const getClientDetails = (state) => state.allClients.clientDetails
export const getBillNumber = (state) => state.allClients.billNumber


export const {
    setClientName,
    setclientDetails,
    setbillNumber
} = clientSlice.actions

export default clientSlice.reducer
