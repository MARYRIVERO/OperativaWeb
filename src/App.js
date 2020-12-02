import React, { useEffect } from 'react';
import ReactGa from 'react-ga';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';

import { reducers } from './redux-store';
import Router from './Router/router';

// Redux - Persiste
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store)

const App = () => {
  useEffect(() => {
    ReactGa.initialize('UA-179958704-1');
    //page view
    ReactGa.pageview(window.location.pathname + window.location.search);
  }, []);

  /**
   * Provider: Donde se almacena la información al store
   */
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <div className="container-fluid container-no-padding">
        <Router />
      </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
