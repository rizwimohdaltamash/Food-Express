import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from "@material-tailwind/react";
import {Provider} from 'react-redux';
import {store} from './redux/store';
import { SidebarProvider } from "../src/context/SidebarProvider.jsx"; // Update the path as per your file structure

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   
   <Provider store={store}>
   <ThemeProvider>
   <SidebarProvider>
      <App />
    </SidebarProvider>

      </ThemeProvider>
   </Provider>
   
  </React.StrictMode>
);


reportWebVitals();
