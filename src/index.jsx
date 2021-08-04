import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';

const render = (Component) =>
  ReactDOM.render(
    <BrowserRouter>
      <AppContainer>
        {Component}
      </AppContainer>
    </BrowserRouter>,
    document.getElementById('root')
  );

render(<App />);

// Webpack Hot Module Replacement API
if (module.hot) module.hot.accept('./App', () => render(<App />));
