import React from 'react';
import { Provider as ReduxProvider} from 'react-redux';
import {store} from "./redux/store"
import { createRoot } from 'react-dom/client';
import { BrowserRouter} from "react-router-dom";
import App from './application/App';
import reportWebVitals from './application/reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
  <ReduxProvider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </ReduxProvider>
  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();