import React from "react";
import { View, Text, StyleSheet } from "react-native"

export default class StudentCard extends React.Component{
  render(){
    var timelastout = new Date(this.props.student.timelastout);
    var style = StyleSheet.flatten([styles.container, {borderColor: this.props.student.location.colour}])
    return(
      <View style={style}>
        <Text>{timelastout.toLocaleTimeString()}</Text>
        <Text>{timelastout.toLocaleDateString()}</Text>
        <Text>{this.props.student.firstname} {this.props.student.surname}</Text>
        <Text>{this.props.student.location.name}</Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    borderWidth: 10,
    backgroundColor: "#FFFFFF",
    flex: 1,
    padding: 10,
      margin: 40,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: "stretch"
  }
})
