import React from 'react';
import ReactDOM from 'react-dom/client';
import {ThemeProvider} from '@mui/material/styles'

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// import thunk from 'redux-thunk'; - already imoprted from new configureStore @reduxjs.toolkit

// import { postsSlice } from './reducers/posts';
import postsSlice from './reducers/posts';
import authSlice from './reducers/auth';

import App from './App';
import {theme} from './Theme';
import './index.css';




const store = configureStore({
  reducer:{
    postsSlice:postsSlice,
    authSlice:authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App defaultChecked />
    </ThemeProvider>
  </Provider>
);
