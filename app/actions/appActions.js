import { emit, on } from "../socket";
import { AsyncStorage } from "react-native";

const SOCKET_AUTHENTICATE_SEND = "socket-client-server-app-authenticate";
const SOCKET_AUTHENTICATE_RECEIVE = "socket-server-client-app-authenticate";
const SOCKET_READ_TOKEN_SEND = "socket-client-server-app-read-token";
const SOCKET_READ_TOKEN_RECEIVE = "socket-server-client-app-read-token";
const SOCKET_READ_MAJOR_SEND = "socket-client-server-app-read-major";
const SOCKET_READ_MAJOR_RECEIVE = "socket-server-client-app-read-major";
const SOCKET_READ_MINOR_SEND = "socket-client-server-app-read-minor";
const SOCKET_READ_MINOR_RECEIVE = "socket-server-client-app-read-minor";
const SOCKET_READ_LOCATIONS_SEND = "socket-client-server-app-read-locations";
const SOCKET_READ_LOCATIONS_RECEIVE = "socket-server-client-app-read-locations";
const SOCKET_UPDATE_LOCATION_SEND = "socket-client-server-app-update-location";
const SOCKET_UPDATE_LOCATION_RECEIVE = "socket-server-client-app-update-location";


export function authenticateStudent(username, password){
  return dispatch => {
    dispatch({type: "AUTHENTICATE_STUDENT"});
    emit(SOCKET_AUTHENTICATE_SEND, {username: username, password: password});
    on(SOCKET_AUTHENTICATE_RECEIVE, (response) => {
      if(response.success){
        if(response.authenticated){
          try {
              AsyncStorage.setItem('@RIDGE:auth_token', response.token, () => {
                dispatch({type: "AUTHENTICATE_STUDENT_FULFILLED", payload: response.success});
                dispatch(readStudent());
              });
            } catch (error) {
              dispatch({type: "AUTHENTICATE_STUDENT_REJECTED", payload: error});
            }
        }else{
          dispatch({type: "AUTHENTICATE_STUDENT_DENIED", payload: false});
        }
      }
      else{
        dispatch({type: "AUTHENTICATE_STUDENT_REJECTED", payload: response.reason});
      }
    });
  }
}

export function readStudent(){
  return dispatch => {
    dispatch({type: "READ_STUDENT"});
    try {
        AsyncStorage.getItem('@RIDGE:auth_token', (err, token) => {
          if (token !== null){
            emit(SOCKET_READ_TOKEN_SEND, {token: token});
            on(SOCKET_READ_TOKEN_RECEIVE, (response) => {
              if(response.success){
                if(response.empty){
                    dispatch({type: "READ_STUDENT_EMPTY", payload: false});
                }
                else {
                    dispatch({type: "READ_STUDENT_FULFILLED", payload: response.student});
                }
              }
              else{
                dispatch({type: "READ_STUDENT_REJECTED", payload: response.reason});
              }
            });
          }
          else{
            dispatch({type: "READ_STUDENT_EMPTY", payload: false});
          }
        });
      } catch (error) {
        dispatch({type: "READ_STUDENT_REJECTED", payload: error});
      }
  }
}

export function readStudentMajor(id){
  return dispatch => {
    dispatch({type: "READ_STUDENT_MAJOR"});
    emit(SOCKET_READ_MAJOR_SEND, id);
    on(SOCKET_READ_MAJOR_RECEIVE, (response) => {
      if(response.success){
        dispatch({type: "READ_STUDENT_MAJOR_FULFILLED", payload: response.student});
      }
      else{
        dispatch({type: "READ_STUDENT_MAJOR_REJECTED", payload: response.reason});
      }
    });
  }
}

export function readStudentMinor(id){
  return dispatch => {
    dispatch({type: "READ_STUDENT_MINOR"});
    emit(SOCKET_READ_MINOR_SEND, id);
    on(SOCKET_READ_MINOR_RECEIVE, (response) => {
      if(response.success){
        dispatch({type: "READ_STUDENT_MINOR_FULFILLED", payload: response.student});
      }
      else{
        dispatch({type: "READ_STUDENT_MINOR_REJECTED", payload: response.reason});
      }
    });
  }
}

export function readLocations(house){
  return dispatch => {
    dispatch({type: "READ_LOCATIONS"});
    emit(SOCKET_READ_LOCATIONS_SEND, {house: house});
    on(SOCKET_READ_LOCATIONS_RECEIVE, (response) => {
      if(response.success){
        dispatch({type: "READ_LOCATIONS_FULFILLED", payload: response.locations});
      }
      else{
        dispatch({type: "READ_LOCATIONS_REJECTED", payload: response.reason});
      }
    });
  }
}

export function updateLocation(studentID, locationID){
  return dispatch => {
    dispatch({type: "UPDATE_LOCATION"});
    emit(SOCKET_UPDATE_LOCATION_SEND, {studentID: studentID, locationID: locationID});
    on(SOCKET_UPDATE_LOCATION_RECEIVE, (response) => {
      if(response.success){
        dispatch({type: "UPDATE_LOCATION_FULFILLED", payload: response.student});
      }
      else{
        dispatch({type: "UPDATE_LOCATION_REJECTED", payload: response.reason})
      }
    })
  }
}