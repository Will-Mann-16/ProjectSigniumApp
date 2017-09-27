import React from "react";
import { connect } from "react-redux";
import { AppNavigator } from "../navigators/AppNavigator";
import { View, Text, StyleSheet } from "react-native";
import * as appActions from "../actions/appActions";
import {activateListener} from "../socket";
import LoginScreen from "./LoginScreen";



class AppLayout extends React.Component{
  componentWillMount(){
      this.props.dispatch(appActions.readStudent());
  }
  render(){
      const LoadingScreen = () => {
          return (<View style={styles.loadingScreen}><Text style={styles.loadingText}>Welcome To RIDGE</Text></View>)
      };
      if(this.props.app.fetching){
          return (<LoadingScreen/>)
      }
      else if(this.props.app.authenticated){
          this.props.dispatch(appActions.readStudentMajor(this.props.app.student._id));
          this.props.dispatch(appActions.readLocations(this.props.app.student._house));
          activateListener(this.props.dispatch, this.props.app.student._house, this.props.app.student._id);
          return (<AppLayout/>)
      }
      else if(this.props.app.fetched){
          return (<LoginScreen/>);
      }
      return null;
  }
}

const styles = StyleSheet.create({
   loadingScreen:{
     flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
   },
   loadingText:{
     fontSize: 40,
       fontWeight: "bold"
   }
});

function mapStateToProps(state){
  return {
    app: state.app
  }
}

export default connect(mapStateToProps)(AppLayout);
