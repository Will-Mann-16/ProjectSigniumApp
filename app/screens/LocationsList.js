import React from "react"
import {connect} from "react-redux"
import { SectionList, Text, StyleSheet, TouchableOpacity } from "react-native"
import * as appActions from "../actions/appActions"

class LocationsList extends React.Component{
  static navigationOptions = {
    title: "Select Location",
      gesturesEnabled: true,
      mode: "modal"
  }
  updateLocation(location){
    this.props.dispatch(appActions.updateLocation(this.props.app.student._id, location));
    this.props.navigation.goBack();
  }
  refreshData(){
    this.props.dispatch(appActions.fetchLocations(this.props.app.student._house))
  }
  render(){
    var locationItem = ({item}) =>{
        return (<TouchableOpacity style={[styles.locationButton, {backgroundColor: item.colour}]} onPress={this.updateLocation.bind(this, item._id)}><Text style={styles.locationText}>{item.name}</Text></TouchableOpacity>)
    }
    var locationHeader = ({section}) => {
      return section.key !== "" ? (<Text style={styles.locationHeader}>{section.key}</Text>) : null
    }
    var items = [];
    for(var i = 0; i < 3; i++){
      items[i] = [];
      this.props.app.locations.forEach(function(location){
        if(location.heading == i){
          items[i].push(location);
        }
        });
    }
    return(
      <SectionList style={styles.container} renderItem={locationItem} renderSectionHeader={locationHeader} sections={
        [{data: items[0], key: ""},
        {data: items[1], key: "In College"},
        {data: items[2], key: "Out of College"}]
      } />
    );
  }
}

var styles = StyleSheet.create({
    container:{
      backgroundColor: "white"
    },
  locationHeader:{
    textAlign: "center",
    fontSize: 20,
    fontWeight: 'bold'
  },
  locationButton:{
    flex: 1,
      alignItems: "center",
      alignSelf: "stretch",
      padding: 20
  },
    locationText:{
      color: "white",
        fontWeight: "bold"
    }
});

function mapStateToProps(state){
  return {
    app: state.app
  };
}

export default connect(mapStateToProps)(LocationsList);
