import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { NavigationActions, DrawerNavigator } from "react-navigation";
import LocationsList from "./LocationsList";
import StudentCard from "./StudentCard";
import Drawer from 'react-native-drawer';

class HomeScreen extends React.Component{
  static navigationOptions = {
    title: "Home",
    gesturesEnabled: false
  }

  openNavigator(){
    this._drawer.open();
  }
  render(){
    if(!this.props.app.authenticated) {
        return null;
    }
    return(
        <Drawer type="overlay" tapToClose={true} ref={(ref) => this._drawer = ref} content={<LocationsList/>}>
          <View style={styles.container}>
            <StudentCard student={this.props.app.student} />
            <TouchableOpacity style={styles.button} onPress={this.openNavigator.bind(this)}>
                <Text style={styles.buttonText}>LOCATIONS</Text>
            </TouchableOpacity>
          </View>
        </Drawer>
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
    }
});

function mapStateToProps(state){
  return {
    app: state.app
  };
}

export default connect(mapStateToProps)(HomeScreen);
