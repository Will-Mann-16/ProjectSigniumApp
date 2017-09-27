import React from 'react';
import { Provider } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import store from "./app/store";
import AppLayout from "./app/screens/AppLayout"
import {connect} from "./app/socket";

export default class App extends React.Component {
  componentWillMount(){
    connect();
  }
  render() {
    return (
      <Provider store={store}>
        <AppLayout/>
      </Provider>
    );
  }
}
