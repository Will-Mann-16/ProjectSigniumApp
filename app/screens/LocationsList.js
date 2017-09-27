import React from "react"
import {connect} from "react-redux"
import { SectionList, Text, StyleSheet } from "react-native"
import * as appActions from "../actions/appActions"

class LocationsList extends React.Component{
  updateLocation(location){

  }
  refreshData(){
    this.props.dispatch(appActions.fetchLocations(this.props.app.student._house))
  }
  render(){
    var locationItem = ({item}) =>{
      var style = StyleSheet.flatten(styles.locationButton, {backgroundColor: item.colour});
      return (<Text style={style}>{item.name}</Text>)
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
    textAlign: "center",
    padding: 10,
    flex: 1,
    color: "white"
  }
});

function mapStateToProps(state){
  return {
    app: state.app
  };
}

export default connect(mapStateToProps)(LocationsList);
