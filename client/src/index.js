import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';


// import thunk from 'redux-thunk'; - already imoprted from new configureStore @reduxjs.toolkit

// import { postsSlice } from './reducers/posts';
import postsSlice from './reducers/posts';
import authSlice from './reducers/auth';
import accountSlice from './reducers/account';

import App from './App';
import './index.css';


const store = configureStore({
  reducer:{
    postsSlice:postsSlice,
    authSlice:authSlice,
    accountSlice:accountSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <App defaultChecked />
  </Provider>
);
