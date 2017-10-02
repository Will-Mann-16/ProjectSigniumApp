import React from "react";
import { Text, TouchableOpacity, View, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";
import StudentCard from "./StudentCard";
import {logout} from "../actions/appActions"


class HomeScreen extends React.Component{
  static navigationOptions = {
    title: "Home",
    gesturesEnabled: false
  }
  openNavigator(){
    this.props.navigation.navigate("Locations");
  }
  logout(){
      this.props.dispatch(logout());
  }
  render(){
    return(
          <View style={styles.container}>
              <TouchableOpacity style={styles.logoutButton} onPress={this.logout.bind(this)}><Text style={{color: "white", fontWeight: "bold", textAlign: "center"}}>LOGOUT</Text></TouchableOpacity>
            <StudentCard student={this.props.app.student} />
            <TouchableOpacity style={styles.button} onPress={this.openNavigator.bind(this)}>
                <Text style={styles.buttonText}>LOCATIONS</Text>
            </TouchableOpacity>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center'
  },
  titleText:{
    fontSize: 24,
    fontWeight: 'bold'
  },
    button:{
        margin: 10,
        padding: 30,
        backgroundColor: "#333",
        alignSelf: 'stretch',
        alignItems: 'center'
    },
    buttonText:{
        color: "white",
        fontWeight: "400"
    },
    logoutButton:{
      alignSelf: "stretch",
        padding: 10,
        backgroundColor: "red",
    }
});

function mapStateToProps(state){
  return {
    app: state.app
  };
}

export default connect(mapStateToProps)(HomeScreen);
