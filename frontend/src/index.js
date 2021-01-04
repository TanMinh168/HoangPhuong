import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './index.css';
import SideBar from './SideBar';
import store from './store';

ReactDOM.render(
    <Provider store = {store}>
      <SideBar />
    </Provider>, document.getElementById('root')
);

