import * as appActions from './actions/appActions';
import io from "socket.io-client";

//const HOST_IP = "http://ridge-server.azurewebsites.net:8080";
//const HOST_IP = "http://10.0.0.253:8081";
//const HOST_IP = "http://10.11.0.23:8081";
const HOST_IP = "http://10.18.112.208:8081";


var socket;
export var connected = false;

export function connect(){
  if(!connected) {
      socket = io.connect(HOST_IP);
  }
}

export function activateListener(dispatch, house, id) {
  if(!connected){
  socket.on('connect', () => {
    connected = true;
      socket.on('socket-server-client-redraw-minor', response => {
        if (house === response.house) {
          dispatch(appActions.readStudentMinor(id));
        }
      });
      socket.on('socket-server-client-redraw-major', response => {
        if (house === response.house) {
          dispatch(appActions.readStudentMajor(id));
          dispatch(appActions.readLocations(house));
        }
      });
    });
}
}

export function emit(value, packet = {}) {
    socket.emit(value, packet);
}

export function on(value, callback) {
    socket.on(value, callback);
}
