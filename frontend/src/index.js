import React from 'react';
import ReactDOM from 'react-dom';
// Needed to implement store.js into the app
import { Provider } from 'react-redux';
// import store to pass it into the provider
import store from './store';
// import './bootstrap.min.css';
import './custom.scss';
import App from './App';
import SimpleReactLightbox from 'simple-react-lightbox';

ReactDOM.render(
  <Provider store={store}>
    <SimpleReactLightbox>
      <App />
    </SimpleReactLightbox>
  </Provider>,
  document.getElementById('root')
);
