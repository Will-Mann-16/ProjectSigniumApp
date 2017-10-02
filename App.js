import React from 'react';
import { Provider } from 'react-redux';
import store from "./app/store";
import AppLayout from "./app/screens/AppLayout";
import { readStudent } from "./app/actions/appActions";
import {connect} from "./app/socket";

export default class App extends React.Component {
  componentWillMount(){
    connect();
    store.dispatch(readStudent());
  }

  render() {
    return (
      <Provider store={store}>

        <AppLayout/>
      </Provider>
    );
  }
}
